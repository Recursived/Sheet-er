import React from 'react';
import { FormattedMessage } from 'react-intl';
import { 
  takeLatest, 
  select, 
  put, 
  debounce 
} from 'redux-saga/effects';


import { enqueueSnackbar } from 'containers/NotifProvider/actions';
import { 
  makeSelectUserInfo,
} from 'containers/App/selectors';

import { 
  makeSelectFilterTag 
} from 'containers/EditingPage/selectors';

// Misc import
import {
  REQUEST_SHEET_TYPE,
  REQUEST_SHEET_TAG,
} from './constants';

import { 
  successSheetTypeAction 
} from './actions';

import messages from './messages';
import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';


// Individual exports for testing
export function* handleRequestSheetType(args) {
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
    yield put(successSheetTypeAction(sheet_types.data));
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


export function* handleRequestSheetTag() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  console.log("ici");
  try {
    const user_info = yield select(makeSelectUserInfo());
    const filter_tag = yield select(makeSelectFilterTag());
    const sheet_tags = yield client.sheettag_list(
      [{ name: 'search', value: filter_tag, in: 'query' }],
      null,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );
    console.log(sheet_tags);
    // yield put(successSheetTypeAction(sheet_types.data));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: "bite",
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

/**
 * Watcher saga
 */
export default function* handlerSaga() {
  yield takeLatest(REQUEST_SHEET_TYPE, handleRequestSheetType);
  // yield takeLatest(REQUEST_ADD_SHEETTAG, handleRequestSheetType);
  yield debounce( 1000, REQUEST_SHEET_TAG, handleRequestSheetTag);
}
