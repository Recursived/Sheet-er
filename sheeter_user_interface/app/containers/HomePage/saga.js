import React from 'react';
import { FormattedMessage } from 'react-intl';
import { put, takeLatest, call, select } from 'redux-saga/effects';

// Action & selector imports
import {
  enqueueSnackbar
} from 'providers/NotifProvider/actions';

import {
  makeSelectUserInfo,
} from 'containers/App/selectors';

import makeSelectHomePage from './selectors';

// Misc imports
import messages from './messages';
import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';
import { successGetSheetList } from './actions';

import { REQUEST_GET_SHEETLIST } from './constants';

export function* handleRequestSheetList(){
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const homepage_info = yield select(makeSelectHomePage());
    // Setting current page
    if (homepage_info.sheets_data === null) {
      var page = 1;
    } else {
      if (homepage_info.sheets_data.next !== null) {
        let reg = /page=([1-9]+)/g;
        var page = reg.exec(homepage_info.sheets_data.next)[1];
      }
    }

    // if there is a next page or first call => nothing happens
    if (
      homepage_info.sheets_data === null ||
      (homepage_info.sheets_data !== null &&
        homepage_info.sheets_data.next !== null)
    ) {
      const sheets = yield client.sheet_list(
        [
          { name: 'search', value: homepage_info.searchfilter, in: 'query' },
          { name: 'page', value: page, in: 'query' },
        ],
        null,
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );

      // Concat & remove self record
      if (homepage_info.sheets_data !== null) {
        let arr = homepage_info.sheets_data.results.concat(sheets.data.results);
        sheets.data.results = arr;
      }

      yield put(successGetSheetList(sheets.data));
    }


  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorsearchsheet} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export default function* handlerSaga() {
  yield takeLatest(REQUEST_GET_SHEETLIST, handleRequestSheetList);
}