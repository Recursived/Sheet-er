import { takeLatest, call, put, select } from 'redux-saga/effects';

import { makeSelectUserInfo } from 'containers/App/selectors';
import {
  REQUEST_GET_SHEETINFO,
} from './constants'

import makeSelectSheetPage from './selectors';
import messages from './messages';


import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';

export function* requestSheetInfoSaga() {
  console.log("ici");
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
    yield put(successSheetTypeAction(sheet_record.data));
  } catch (error) {
    // yield put(enqueueSnackbar({
    //   message: <FormattedMessage {...messages.errorsheettypes} />,
    //   options: {
    //     key: new Date().getTime() + Math.random(),
    //     variant: 'error'
    //   },
    // }));
  }
}

// Individual exports for testing
export default function* handlerSaga() {
  takeLatest(REQUEST_GET_SHEETINFO, requestSheetInfoSaga)
}
