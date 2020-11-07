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
import {isLoggedOutSuccessAction, isLoggedSuccessAction } from './actions';
import messages from './messages';

// Handler sagas
export function* handleRequestLogIn() {
  

}



// Watcher sagas
export default function* globalSaga() {
  yield takeLatest(REQUEST_LOG_IN, handleRequestLogIn);
}
