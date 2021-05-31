import { call, put, select, takeLatest } from 'redux-saga/effects';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { enqueueSnackbar } from 'providers/NotifProvider/actions';
import { REQUEST_GET_SHEET } from './constants';

import {
  successGetSheet,
} from './actions'

import makeSelectMobileSheetPage from './selectors';
import messages from './messages';
import axios from 'axios';


import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';



export function* requestSheetInfoSaga() {
  const sheetapi = getApi(RETRIEVE_SHEETAPI);
  yield sheetapi.init();
  const clientsheet = yield sheetapi.getClient();
  try {
    const sheet_info = yield select(makeSelectMobileSheetPage())
    const sheet_record = yield call(clientsheet.sheet_read,
      { id: sheet_info.id_sheet },
      null,
      { headers: { 'Authorization': `Bearer ${sheet_info.token}` } }
    );

    const res_author = yield call(axios.get,
      `http://localhost:8001/user/${sheet_record.data.author}/`,
      {
        headers: { 'Authorization': `Bearer ${sheet_info.token}` },
      }
    );

    // // We change the id of the author to the corresponding data
    sheet_record.data.author = res_author.data;

    // TO-DO : get author of sheet
    yield put(successGetSheet(sheet_record.data));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errormessage} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

// Individual exports for testing
export default function* handlerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_GET_SHEET, requestSheetInfoSaga);
}
