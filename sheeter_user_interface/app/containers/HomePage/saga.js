import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import axios from 'axios';
import {
  enqueueSnackbar,
  closeSnackbar,
} from 'containers/NotifProvider/actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { IS_LOGGED_IN, GET_SHEETS } from './constants';
import { getSheetsSuccessAction } from './actions';

// Handler sagas
export function* handleLoggedIn() {
  const logged = false;
  if (!logged) {
    /* yield put(push('/login'));
    yield put(enqueueSnackbar({
      message: 'Redirection au login',
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning'
      },
    })); */
  }
}

export function* handleDataHomePage(){
  const response = yield call(axios.get, "http://127.0.0.1:8000/sheet/");
  yield put(getSheetsSuccessAction(response.data.results));
}

// Watcher sagas
export default function* watchHomePageSaga() {
  yield takeLatest(IS_LOGGED_IN, handleLoggedIn);

  yield takeLatest(GET_SHEETS, handleDataHomePage);
}
