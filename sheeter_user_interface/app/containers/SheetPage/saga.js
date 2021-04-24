import React from 'react';
import routes from 'utils/routes';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
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
import axios from 'axios';


import getApi from 'utils/api';
import {
  RETRIEVE_SHEETAPI,
  RETRIEVE_USERAPI
} from 'utils/api';

export function* requestSheetInfoSaga() {
  const sheetapi = getApi(RETRIEVE_SHEETAPI);
  const userapi = getApi(RETRIEVE_USERAPI);
  yield userapi.init();
  yield sheetapi.init();
  const clientsheet = yield sheetapi.getClient();
  const clientuser = yield userapi.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const sheet_info = yield select(makeSelectSheetPage())
    const sheet_record = yield call(clientsheet.sheet_read,
      { id: sheet_info.id_sheet },
      null,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );

    const res_author = yield call(axios.get,
      `http://localhost:8001/user/${sheet_record.data.author}/`,
      {
        headers: { 'Authorization': `Bearer ${user_info.access_token.token}` },
      }
    );

    // // We change the id of the author to the corresponding data
    sheet_record.data.author = res_author.data;

    // TO-DO : get author of sheet
    yield put(successGetSheetInfoAction(sheet_record.data));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorretrievesheet} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
    yield put(push("../404"))
  }
}


export default function* handlerSaga() {
  yield takeLatest(REQUEST_GET_SHEETINFO, requestSheetInfoSaga);
}