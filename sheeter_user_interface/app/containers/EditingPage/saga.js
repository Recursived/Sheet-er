import React from 'react';
import { FormattedMessage } from 'react-intl';
import { takeLatest, select, put } from 'redux-saga/effects';

// Misc import
import { enqueueSnackbar } from 'containers/NotifProvider/actions';
import { makeSelectUserInfo } from 'containers/App/selectors';
import { REQUEST_SHEET_TYPE } from './constants';
import { successSheetTypeAction } from './actions';
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

/**
 * Watcher saga
 */
export default function* globalSaga() {
  yield takeLatest(REQUEST_SHEET_TYPE, handleRequestSheetType);
}
