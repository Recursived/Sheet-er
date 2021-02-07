import React from 'react';
import { FormattedMessage } from 'react-intl';
import { 
  takeLatest, 
  select, 
  put, 
} from 'redux-saga/effects';


import { enqueueSnackbar } from 'containers/NotifProvider/actions';
import { 
  makeSelectUserInfo,
} from 'containers/App/selectors';

import { 
  makeSelectFilterTag,
  makeSelectAddTag
} from 'containers/EditingPage/selectors';

// Misc import
import {
  REQUEST_SHEET_TYPE,
  REQUEST_SHEET_TAG,
  REQUEST_ADD_SHEETTAG
} from './constants';

import { 
  successSheetTypeAction,
  successSheetTagAction,
  successAddSheetTagAction
} from './actions';

import messages from './messages';
import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';


// Individual exports for testing
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
  try {
    const user_info = yield select(makeSelectUserInfo());
    const filter_tag = yield select(makeSelectFilterTag());
    const sheet_tags = yield client.sheettag_list(
      [{ name: 'search', value: filter_tag, in: 'query' }],
      null,
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    );
    yield put(successSheetTagAction(sheet_tags.data.results));
  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorsheettag} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export function* handleRequestAddSheetTag() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const add_tag = yield select(makeSelectAddTag());
    const res = yield client.sheettag_create(
      null,
      { label: add_tag },
      { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
    )
    yield put(successAddSheetTagAction(res.data));

  } catch (error) {
    console.log(error);
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.erroraddsheettag} />,
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
  yield takeLatest(REQUEST_ADD_SHEETTAG, handleRequestAddSheetTag);
  yield takeLatest(REQUEST_SHEET_TAG, handleRequestSheetTag);
}
