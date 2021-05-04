/*
 *
 * EditingPage actions
 *
 */

import {
  REQUEST_SHEET_TYPE,
  SUCCESS_SHEET_TYPE,
  REQUEST_SHEET_TAG,
  SUCCESS_SHEET_TAG,
  REQUEST_ADD_SHEETTAG,
  SUCCESS_ADD_SHEETTAG,
  REQUEST_SET_EDITORCONTENT,
  REQUEST_SET_LOCALESHEET,
  REQUEST_SET_TITLESHEET,
  REQUEST_SET_TYPESHEET,
  REQUEST_SET_DESCRSHEET,
  REQUEST_SET_LINKSHEET,
  REQUEST_ADD_SHEET,
  SUCCESS_ADD_SHEET,
  SUCCESS_DELETE_SHEET,
  REQUEST_DELETE_SHEET,
  REQUEST_OPEN_DIALOGLINK,
  REQUEST_ADD_LINKSHEET,
  SUCCESS_ADD_LINKSHEET,
  REQUEST_EDIT_MYSHEET,
  SUCCESS_EDIT_MYSHEET

} from './constants';

export function requestSheetTypeAction() {
  return {
    type: REQUEST_SHEET_TYPE,
  };
}

export function successSheetTypeAction(sheet_types) {
  return {
    type: SUCCESS_SHEET_TYPE,
    sheet_types: sheet_types
  };
}

export function requestSheetTagAction(filter) {
  return {
    type: REQUEST_SHEET_TAG,
    filter: filter
  };
}

export function successSheetTagAction(tags) {
  return {
    type: SUCCESS_SHEET_TAG,
    tags: tags
  };
}

export function requestAddSheetTagAction(tags) {
  return {
    type: REQUEST_ADD_SHEETTAG,
    tags: tags
  };
}

export function successAddSheetTagAction(response) {
  return {
    type: SUCCESS_ADD_SHEETTAG,
    response: response
  };
}

/**
 * Actions to set values for the editor and the associated content
 */
export function requestSetEditorContent(content) {
  return {
    type: REQUEST_SET_EDITORCONTENT,
    content: content
  }
}

export function requestSetTitleSheet(title) {
  return {
    type: REQUEST_SET_TITLESHEET,
    title: title
  }
}

export function requestSetLocaleSheet(locale) {
  return {
    type: REQUEST_SET_LOCALESHEET,
    locale: locale
  }
}

export function requestSetTypeSheet(sheet_type) {
  return {
    type: REQUEST_SET_TYPESHEET,
    sheet_type: sheet_type
  }
}

export function requestSetDescrSheet(descr_sheet) {
  return {
    type: REQUEST_SET_DESCRSHEET,
    descr_sheet: descr_sheet
  }
}

export function requestSetLinkIDSheet(link_id) {
  return {
    type: REQUEST_SET_LINKSHEET,
    link_id: link_id
  }
}



/**
 * Actions used to create, modify or delete a sheet
 */

export function requestAddSheet() {
  return {
    type: REQUEST_ADD_SHEET
  }
}

export function successAddSheet(id_sheet) {
  return {
    type: SUCCESS_ADD_SHEET,
    id: id_sheet
  }
}

export function requestDeleteSheet(permanent) {
  return {
    type: REQUEST_DELETE_SHEET,
    permanent: permanent
  }
}


export function successDeleteSheet() {
  return {
    type: SUCCESS_DELETE_SHEET,
  }
}

// Actions used to retrieve and set link sheet data
export function requestAddLinkSheet() {
  return {
    type: REQUEST_ADD_LINKSHEET,
  }
}

export function successAddLinkSheet(link_sheet){
  return {
    type: SUCCESS_ADD_LINKSHEET,
    link_sheet: link_sheet
  }
}

// Misc actions
export function requestOpenLinkSheetDialog(boolean){
  return {
    type: REQUEST_OPEN_DIALOGLINK,
    boolean: boolean
  }
}

export function requestEditSheet(){
  return {
    type: REQUEST_EDIT_MYSHEET,
  }
}

export function successEditSheet(sheet){

  return {
    type: SUCCESS_EDIT_MYSHEET,
    sheet: sheet
  }
}

