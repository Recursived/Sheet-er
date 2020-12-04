import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import axios from 'axios';
import {
  enqueueSnackbar,
  closeSnackbar,
} from 'containers/NotifProvider/actions';

import { makeSelectLocation } from './selectors';
import { FormattedMessage } from 'react-intl';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import { IS_LOGGED_IN_SUCCESS, IS_LOGGED_OUT_SUCCESS, REQUEST_LOG_IN, REQUEST_LOG_OUT } from './constants';
import { isLoggedSuccessAction, isLoggedOutSuccessAction } from './actions';
import { makeSelectConnInfo } from './selectors';
import messages from './messages';

import getApi from 'utils/api';
import routes from 'utils/routes';
import { RETRIEVE_USERAPI, CLIENT_ID } from 'utils/api';

/**
 * Handler saga
 */
export function* handleRequestLogIn() {

  const api = getApi(RETRIEVE_USERAPI);
  yield api.init()

  

  const conn_info = yield select(makeSelectConnInfo());
  const client = yield api.getClient();

  try {
    const retour = yield client.paths["/auth/convert-token/"].post({
      grant_type : 'convert_token',
      client_id : CLIENT_ID,
      backend: conn_info.backend,
      token: conn_info.social_token
    });
    console.log(retour);
    const response = yield client.paths["/user/{uid}/{provider}"].get(
      {uid: conn_info.uid, provider: conn_info.backend},
      null,
      { headers: { 'Authorization': `Bearer ${retour.data.access_token}` }}
    );
    yield put(isLoggedSuccessAction(response.data));
    yield put(push(routes.homepage.path));
  } catch {
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
        variant: 'warning'
    },
  }));
  yield put(push(routes.loginpage.path));
}


/**
 * Watcher saga
 */
export default function* globalSaga() {
  yield takeLatest(REQUEST_LOG_IN, handleRequestLogIn);
  yield takeLatest(REQUEST_LOG_OUT, handleRequestLogOut)
}
