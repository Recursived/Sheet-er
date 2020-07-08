/*
 *
 * HomePage actions
 *
 */

import { IS_LOGGED_IN, GET_SHEETS, GET_SHEETS_SUCCESS} from './constants';

export function isLoggedAction() {
  return {
    type: IS_LOGGED_IN,
  };
}

export function getSheetsAction() {
  return {
    type: GET_SHEETS,
  }
}

export function getSheetsSuccessAction(lst) {
  return {
    type: GET_SHEETS_SUCCESS,
    sheets: lst
  }
}