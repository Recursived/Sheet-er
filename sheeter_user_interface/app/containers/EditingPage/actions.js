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
  REQUEST_SET_IDSHEET,
  REQUEST_SET_TYPESHEET,
  REQUEST_SET_TAGSHEET
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
    tags : tags
  };
}

export function requestAddSheetTagAction(add_tag) {
  return {
    type: REQUEST_ADD_SHEETTAG,
    add_tag: add_tag
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
export function requestSetEditorContent(content){
  return {
    type: REQUEST_SET_EDITORCONTENT,
    content: content
  }
}

export function requestSetTitleSheet(title){
  return {
    type: REQUEST_SET_TITLESHEET,
    title: title
  }
}

export function requestSetLocaleSheet(locale){
  return {
    type: REQUEST_SET_LOCALESHEET,
    locale: locale
  }
}

export function requestSetTypeSheet(sheet_type){
  return {
    type: REQUEST_SET_TYPESHEET,
    sheet_type: sheet_type
  }
}

export function requestSetTagSheet(tags){
  return {
    type: REQUEST_SET_TAGSHEET,
    tags: tags
  }
}

export function requestSetIdSheet(id_sheet){
  return {
    type: REQUEST_SET_IDSHEET,
    id_sheet: id_sheet
  }
}

