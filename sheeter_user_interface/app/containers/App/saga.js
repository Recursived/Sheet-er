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
import { isLoggedSuccessAction } from './actions';
import { makeSelectConnInfo } from './selectors';
import messages from './messages';

import getApi from 'utils/api';
import { userAPI } from 'utils/api';

/**
 * Handler saga
 */
export function* handleRequestLogIn() {
  // We check for the existence of the user
  const api = getApi(userAPI);
  try {
    const conn_info = yield select(makeSelectConnInfo());
    console.log(conn_info);
    console.log(api);
  } catch (error){
    // enqueueSnackbar here to send info on the error.
  }


  // If he doesn't exist we create it

}

export function* handleRequestLogOut() {
  

}


/**
 * Watcher saga
 */
export default function* globalSaga() {
  yield takeLatest(REQUEST_LOG_IN, handleRequestLogIn);
  yield takeLatest(REQUEST_LOG_OUT)
}
