import React from 'react';
import { push } from 'connected-react-router';
import { enqueueSnackbar } from 'containers/NotifProvider/actions';


import { FormattedMessage } from 'react-intl';
import { put, takeLatest, select } from 'redux-saga/effects';
import {
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
  REQUEST_CATEGORIES,
  REQUEST_SEND_RESPONSE

} from './constants';
import {
  isLoggedSuccessAction,
  isLoggedOutSuccessAction,
  isCategoriesSuccessAction
} from './actions';
import {
  makeSelectConnInfo,
  makeSelectMessageDialog,
  makeSelectUserInfo
} from './selectors';

import messages from './messages';
import getApi from 'utils/api';
import routes from 'utils/routes';
import { RETRIEVE_USERAPI, RETRIEVE_CONTACTUS, CLIENT_ID } from 'utils/api';

/**
 * Handler saga
 */
export function* handleRequestLogIn() {

  const api = getApi(RETRIEVE_USERAPI);
  yield api.init();


  const conn_info = yield select(makeSelectConnInfo());
  const client = yield api.getClient();

  try {
    const retour = yield client.paths["/auth/convert-token/"].post({
      grant_type: 'convert_token',
      client_id: CLIENT_ID,
      backend: conn_info.backend,
      token: conn_info.social_token
    });
    const response = yield client.paths["/user/{uid}/{provider}"].get(
      { uid: conn_info.uid, provider: conn_info.backend },
      null,
      { headers: { 'Authorization': `Bearer ${retour.data.access_token}` } }
    );
    yield put(isLoggedSuccessAction(response.data));
    yield put(push(routes.homepage.path));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.loginError} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }


}

export function* handleRequestLogOut() {
  yield put(isLoggedOutSuccessAction());
  yield put(enqueueSnackbar({
    message: <FormattedMessage {...messages.logoutSuccess} />,
    options: {
      key: new Date().getTime() + Math.random(),
      variant: 'info'
    },
  }));
  yield put(push(routes.loginpage.path));
}


export function* handleRequestCategories() {
  const api = getApi(RETRIEVE_CONTACTUS);
  yield api.init();
  const client = yield api.getClient();

  try {
    const user_info = yield select(makeSelectUserInfo());
    const categories = yield client.category_list(
      null, 
      null,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );

    yield put(isCategoriesSuccessAction(categories.data));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.categoriesError} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export function* handleRequestResponse() {
  const api = getApi(RETRIEVE_CONTACTUS);
  yield api.init();
  const client = yield api.getClient();

  try {
    const message = yield select(makeSelectMessageDialog());
    const user_info = yield select(makeSelectUserInfo());
    yield client.message_create(
      null,
      message,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );
    // Success message
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.messageSuccess} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'success'
      },
    }));
  } catch (error) {
    // Error message
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.messageError} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}



/**
 * Watcher saga
 */
export default function* globalSaga() {
  yield takeLatest(REQUEST_LOG_IN, handleRequestLogIn);
  yield takeLatest(REQUEST_LOG_OUT, handleRequestLogOut)
  yield takeLatest(REQUEST_CATEGORIES, handleRequestCategories);
  yield takeLatest(REQUEST_SEND_RESPONSE, handleRequestResponse)
}
