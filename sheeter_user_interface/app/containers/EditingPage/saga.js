import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  takeLatest,
  select,
  put,
  call,
  takeEvery
} from 'redux-saga/effects';


import { enqueueSnackbar } from 'providers/NotifProvider/actions';

import {
  makeSelectUserInfo,
} from 'containers/App/selectors';
import makeSelectProfilePage from 'containers/ProfilePage/selectors';
import {
  makeSelectFilterTag,
  makeSelectAddTag
} from 'containers/EditingPage/selectors';

// Misc import
import {
  REQUEST_SHEET_TYPE,
  REQUEST_SHEET_TAG,
  REQUEST_ADD_SHEETTAG,
  REQUEST_ADD_SHEET,
  REQUEST_DELETE_SHEET,
  REQUEST_ADD_LINKSHEET,
  REQUEST_EDIT_MYSHEET
} from './constants';

import {
  successSheetTypeAction,
  successSheetTagAction,
  successAddSheetTagAction,
  successAddSheet,
  successDeleteSheet,
  successAddLinkSheet,
  successEditSheet
} from './actions';

import messages from './messages';
import getApi from 'utils/api';
import { RETRIEVE_SHEETAPI } from 'utils/api';
import makeSelectEditingPage from './selectors';
import {
  localeToCode
} from 'utils/utils';


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

    for (let i = 0; i < add_tags.length; i++) {
      const tag = add_tags[i];
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
      delete sheet_info.type_sheet["firstLetter"];
      const res = yield client.sheet_create(
        null,
        {
          content: JSON.stringify(sheet_info.editor_content_sheet),
          title: sheet_info.title_sheet,
          descr: sheet_info.descr_sheet,
          author: user_info.user.id,
          locale: localeToCode[sheet_info.locale_sheet],
          subject: sheet_info.type_sheet,
          plagiarism_rate: 0, // to-do : faire une api qui permet de calculer cela
          tags: sheet_info.tags_sheet
        },
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );
      yield put(successAddSheet(res.data.id));
    } else { // If sheet created, we update
      delete sheet_info.type_sheet["firstLetter"];
      const res = yield client.sheet_update(
        { id: sheet_info.id_sheet },
        {

          content: JSON.stringify(sheet_info.editor_content_sheet),
          title: sheet_info.title_sheet,
          descr: sheet_info.descr_sheet,
          next_sheet: sheet_info.link_id_sheet,
          author: user_info.user.id,
          locale: localeToCode[sheet_info.locale_sheet],
          subject: sheet_info.type_sheet,
          plagiarism_rate: 0, // to-do : faire une api qui permet de calculer cela
          tags: sheet_info.tags_sheet
        },
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );

      yield put(successAddSheet(res.data.id));
    }

  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.erroraddsheet} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export function* handleRequestDeleteSheet() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const sheet_info = yield select(makeSelectEditingPage());

    // We check if Sheet is created
    if (sheet_info.id_sheet !== null) {
      if (sheet_info.permanent_delete) {
        yield client.sheet_delete(
          { id: sheet_info.id_sheet },
          null,
          { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
        );
        yield put(successDeleteSheet());
        yield put(enqueueSnackbar({
          message: <FormattedMessage {...messages.deletesheetpermanent} />,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info'
          },
        }));
      } else {
        yield put(successDeleteSheet());
        yield put(enqueueSnackbar({
          message: <FormattedMessage {...messages.deletesheetcancel} />,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info'
          },
        }));
      }

    }

  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errordeletesheet} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}


export function* handleRequestLinkSheet() {
  const api = getApi(RETRIEVE_SHEETAPI);
  yield api.init();
  const client = yield api.getClient();
  try {
    const user_info = yield select(makeSelectUserInfo());
    const sheet_info = yield select(makeSelectEditingPage());

    // Setting current page
    if (sheet_info.link_sheets_data === null) {
      var page = 1;
    } else {
      if (sheet_info.link_sheets_data.next !== null) {
        let reg = /page=([1-9]+)/g;
        var page = reg.exec(sheet_info.link_sheets_data.next)[1];
      }
    }

    // if there is a next page or first call => nothing happens
    if (
      sheet_info.link_sheets_data === null ||
      (sheet_info.link_sheets_data !== null &&
        sheet_info.link_sheets_data.next !== null)
    ) {
      const sheets = yield client.sheet_list(
        [
          { name: 'author', value: user_info.user.id, in: 'query' },
          { name: 'subject__id', value: sheet_info.type_sheet.id, in: 'query' },
          { name: 'page', value: page, in: 'query' },
        ],
        null,
        { headers: { 'Authorization': `Bearer ${user_info.access_token.token}` } }
      );

      // Concat & remove self record
      if (sheet_info.link_sheets_data !== null) {
        let arr = sheet_info.link_sheets_data.results.concat(sheets.data.results);
        sheets.data.results = arr;
      }

      sheets.data.count -= 1;

      sheets.data.results = sheets.data.results.filter(elem => sheet_info.id_sheet !== elem.id);
      yield put(successAddLinkSheet(sheets.data))
    }


  } catch (error) {
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorlinksheet} />,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error'
      },
    }));
  }
}

export function* handleRequestEditSheet() {

  try {
    const profile_info = yield select(makeSelectProfilePage());
    yield put(successEditSheet(profile_info.sheet));
  } catch (error) {
    console.log(error);
    yield put(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorlinksheet} />,
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
  yield takeLatest(REQUEST_DELETE_SHEET, handleRequestDeleteSheet);
  yield takeLatest(REQUEST_EDIT_MYSHEET, handleRequestEditSheet);

  yield takeEvery(REQUEST_ADD_LINKSHEET, handleRequestLinkSheet);
}
