import { takeLatest, call, put, select } from 'redux-saga/effects';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { enqueueSnackbar } from 'containers/NotifProvider/actions';
import {
  makeSelectUserInfo,
} from 'containers/App/selectors';

import {
  REQUEST_GET_SHEETINFO,
} from './constants'

import {
  successGetSheetInfoAction,
} from './actions'

import makeSelectSheetPage from './selectors';
import messages from './messages';


import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';

export function* requestSheetInfoSaga() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const sheet_info = yield select(makeSelectSheetPage())
    const sheet_record = yield client.sheet_read(
      {id: sheet_info.id_sheet },
      null,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );

    // TO-DO : get author of sheet
    yield put(successGetSheetInfoAction(sheet_record.data));
  } catch (error) {
    console.log(error);
    yield put(enqueueSnackbar({
      message: "test sagas requestSheetInfoSaga",
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}


export default function* handlerSaga() {
  yield takeLatest(REQUEST_GET_SHEETINFO, requestSheetInfoSaga);
}