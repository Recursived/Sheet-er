import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import {
  enqueueSnackbar,
  closeSnackbar,
} from 'containers/NotifProvider/actions';
import { put, takeEvery } from 'redux-saga/effects';
import { IS_LOGGED_IN } from './constants';

// Handler sagas
export function* handleLoggedIn(dispatch) {
  const logged = false;
  if (!logged) {
    // yield put(push('/login'));
    // yield put(enqueueSnackbar({
    //   message: 'Redirection au login',
    //   options: {
    //       key: new Date().getTime() + Math.random(),
    //       variant: 'warning'
    //   },
    // }));
  }
}

// Watcher sagas
export default function* watchHomePageSaga() {
  yield takeEvery(IS_LOGGED_IN, handleLoggedIn);
}
