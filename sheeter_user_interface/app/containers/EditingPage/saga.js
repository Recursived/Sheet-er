import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  takeLatest,
  select,
  put,
  call
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
  REQUEST_ADD_SHEETTAG,
  REQUEST_ADD_SHEET
} from './constants';

import {
  successSheetTypeAction,
  successSheetTagAction,
  successAddSheetTagAction,
  successAddSheet
} from './actions';

import messages from './messages';
import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';
import makeSelectEditingPage from './selectors';
import {
  localeToCode
} from 'i18n';


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
    const add_tags = yield select(makeSelectAddTag());
    const to_send = [];
    console.log(add_tags);

    for (let i = 0; i < add_tags.length; i++) {
      const tag = add_tags[i];
      console.log(tag);
      if (tag.inputValue) {
        const res = yield call(
          client.sheettag_create,
          null,
          { label: tag.inputValue },
          { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
        );
        to_send.push(res.data);
      } else {
        to_send.push(tag);
      }
    }
    yield put(successAddSheetTagAction(to_send));

  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.erroraddsheettag} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export function* handleRequestAddSheet() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const sheet_info = yield select(makeSelectEditingPage());

    // If sheet not yet created
    if (sheet_info.id_sheet === null) {
      const res = yield client.sheet_create(
        null,
        {
          content: JSON.stringify(sheet_info.editor_content_sheet),
          title: sheet_info.title_sheet,
          locale: localeToCode[sheet_info.locale_sheet],
          subject: sheet_info.type_sheet,
          plagiarism_rate: 0, // to-do : faire une api qui permet de calculer cela
          tags: sheet_info.tags_sheet.map(tag => tag.id)
        },
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );
      yield put(successAddSheet(res.data.id));
    } else { // If sheet created, we update
      const res = yield client.sheet_update(
        null,
        {
          content: JSON.stringify(sheet_info.editor_content_sheet),
          title: sheet_info.title_sheet,
          locale: localeToCode[sheet_info.locale_sheet],
          subject: sheet_info.type_sheet,
          plagiarism_rate: 0, // to-do : faire une api qui permet de calculer cela
          tags: sheet_info.tags_sheet.map(tag => tag.id)
        },
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );
      yield put(successAddSheet(res.data.id));
    }

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
  yield takeLatest(REQUEST_ADD_SHEET, handleRequestAddSheet);
}
