/**
 * Create the store with dynamic reducers
 */

import React, { memo } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { REFRESH_TOKEN } from 'containers/App/constants';
import { FormattedMessage } from 'react-intl';
import { enqueueSnackbar, closeSnackbar } from 'containers/NotifProvider/actions';
import { isRefreshAction } from 'containers/App/actions';
import { IS_LOGGED_IN_SUCCESS, IS_LOGGED_OUT_SUCCESS } from 'containers/App/constants';
import messages from 'containers/App/messages';

// Misc import
import createReducer from './reducers';
import { isLoggedSuccessAction } from 'containers/App/actions';
import getApi from 'utils/api';
import { RETRIEVE_USERAPI, CLIENT_ID } from 'utils/api';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }); // SUPPRIMER LES PARAMS

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const checkTokenExpirationMiddleware = store => next => action => {
    const global_scope = store.getState().global;
    const user_info = global_scope.user_info,
      isLogged = global_scope.loggedIn,
      conn_info = global_scope.conn_info,
      dispatch = store.dispatch;


    // User shoud be logged to refresh token
    if (isLogged
      && user_info !== null
      && !(action.type === IS_LOGGED_IN_SUCCESS || action.type === IS_LOGGED_OUT_SUCCESS)) {

      const expiry_date = new Date(user_info.access_token.expires);
      const today = new Date(new Date().toUTCString().substr(0, 25));
      if (today > expiry_date) {
        try {
          const api = getApi(RETRIEVE_USERAPI);
          api.init()
            .then(client => {
              return client.paths["/auth/token/"].post(null,{
                grant_type: 'refresh_token',
                client_id: CLIENT_ID,
                refresh_token: user_info.token
              });
            })
            .then(retour => {
              api.init()
                .then(client => {
                  return client.paths["/user/{uid}/{provider}"].get(
                    { uid: conn_info.uid, provider: conn_info.backend },
                    null,
                    { headers: { 'Authorization': `Bearer ${retour.data.access_token}` } }
                  );
                })
                .then(response =>
                  dispatch(isLoggedSuccessAction(response.data)))
            });
        } catch (error) {
          // We should never have an error !
        }
      }
    }
    next(action);
  };

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    checkTokenExpirationMiddleware,
    sagaMiddleware,
    routerMiddleware(history)
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
