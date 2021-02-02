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
  SUCCESS_ADD_SHEETTAG
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

export function successSheetTagAction() {
  return {
    type: SUCCESS_SHEET_TAG,
  };
}

export function requestAddSheetTagAction(add_tag) {
  return {
    type: REQUEST_ADD_SHEETTAG,
    add_tag: add_tag
  };
}

export function successAddSheetTagAction() {
  return {
    type: SUCCESS_ADD_SHEETTAG,
  };
}