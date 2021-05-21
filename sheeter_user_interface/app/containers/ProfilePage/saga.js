import React from 'react';
import { FormattedMessage } from 'react-intl';
import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  REQUEST_SET_TYPE,
  REQUEST_GET_SHEETTYPE,
  REQUEST_GET_MYSHEETS
} from './constants';

import { enqueueSnackbar } from 'providers/NotifProvider/actions';
import makeSelectProfilePage  from 'containers/ProfilePage/selectors';
import { makeSelectUserInfo } from 'containers/App/selectors';

import {
  requestSucessGetSheetType,
  successGetMySheets
} from './actions';

// Misc imports
import messages from './messages';
import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';

export function* handleRequestSheetType() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const sheet_types = yield client.sheettype_list(
      null,
      null,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );

    yield put(requestSucessGetSheetType(sheet_types.data));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorsheettypes} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export function* handleRequestGetMySheets() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  console.log("zfioh");
  try {
    const user_info = yield select(makeSelectUserInfo());
    const profilepage_info = yield select(makeSelectProfilePage());
    // Setting current page
    if (profilepage_info.sheet_list === null) {
      var page = 1;
    } else {
      page = 1;
      if (profilepage_info.sheet_list.next !== null) {
        let reg = /page=([1-9]+)/g;
        var page = reg.exec(profilepage_info.sheet_list .next)[1];
      }
    }

    // if there is a next page or first call => nothing happens
    if (
      profilepage_info.sheet_list === null ||
      (profilepage_info.sheet_list !== null &&
        profilepage_info.sheet_list.next !== null)
    ) {
      const options = [
        { name: 'author', value: user_info.user.id, in: 'query' },
        { name: 'page', value: page, in: 'query' },
      ];

      if (profilepage_info.type !== null) {
        options.push({ name: 'subject__id', value: profilepage_info.type.id, in: 'query' });
      }
      const sheets = yield client.sheet_list(
        options,
        null,
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );

      if (profilepage_info.sheet_list !== null) {
        let arr = profilepage_info.sheet_list.results.concat(sheets.data.results);
        sheets.data.results = arr;
      }

      yield put(successGetMySheets(sheets.data))
    }


  } catch (error) {
    console.log(error);
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errormysheets} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}


// Individual exports for testing
export default function* handlerSaga() {
  yield takeLatest(REQUEST_GET_SHEETTYPE, handleRequestSheetType);
  yield takeEvery(REQUEST_GET_MYSHEETS, handleRequestGetMySheets);
}
