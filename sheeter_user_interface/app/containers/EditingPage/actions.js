/*
 *
 * EditingPage actions
 *
 */

import { 
  REQUEST_SHEET_TYPE,
  SUCCESS_SHEET_TYPE
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
