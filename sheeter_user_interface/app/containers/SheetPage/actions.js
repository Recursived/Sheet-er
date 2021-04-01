/*
 *
 * SheetPage actions
 *
 */

import { 
  REQUEST_GET_SHEETINFO,
  SUCCESS_GET_SHEETINFO
} from './constants';

export function requestGetSheetInfoAction(id) {
  return {
    type: REQUEST_GET_SHEETINFO,
    id : id
  };
}

export function successGetSheetInfoAction(response) {
  return {
    type: SUCCESS_GET_SHEETINFO,
    response: response 
  };
}