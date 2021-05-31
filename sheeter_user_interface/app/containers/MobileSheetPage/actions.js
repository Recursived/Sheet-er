/*
 *
 * MobileSheetPage actions
 *
 */

import { REQUEST_GET_SHEET, SUCCESS_GET_SHEET } from './constants';

export function requestGetSheet(idsheet, token) {
  return {
    type: REQUEST_GET_SHEET,
    id_sheet: idsheet,
    token: token
  };
}

export function successGetSheet(sheet){
  return {
    type: SUCCESS_GET_SHEET,
    sheet: sheet
  }
}
