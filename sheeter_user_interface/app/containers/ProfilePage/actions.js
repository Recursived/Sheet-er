/*
 *
 * ProfilePage actions
 *
 */

import { 
  REQUEST_SET_TYPE, 
  REQUEST_GET_SHEETTYPE,
  SUCCESS_GET_SHEETTYPE,
  REQUEST_GET_MYSHEETS,
  SUCCESS_GET_MYSHEETS,
  REQUEST_SET_SHEETDATA,
  REQUEST_CLOSE_SHEETDIALOG,
  REQUEST_OPEN_SHEETDIALOG,
  REQUEST_CLEAR_MYSHEETS
} from './constants';

export function requestSetType(sheettype) {
  return {
    type: REQUEST_SET_TYPE,
    sheettype: sheettype
  };
}

export function requestSetSheetData(sheet){
  return {
    type : REQUEST_SET_SHEETDATA,
    sheet: sheet
  }
}

export function requestGetSheetType() {
  return {
    type: REQUEST_GET_SHEETTYPE,
  };
}

export function requestSucessGetSheetType(sheettypes) {
  return {
    type: SUCCESS_GET_SHEETTYPE,
    sheettypes: sheettypes
  };
}

export function requestGetMySheets(){
  return {
    type: REQUEST_GET_MYSHEETS
  }
}

export function requestClearMySheets(){
  return {
    type: REQUEST_CLEAR_MYSHEETS
  }
}

export function successGetMySheets(data){
  return {
    type: SUCCESS_GET_MYSHEETS,
    data: data
  }
}

export function requestOpenSheetDialog(){
  return {
    type: REQUEST_OPEN_SHEETDIALOG,
  }
}

export function requestCloseSheetDialog(){
  return {
    type: REQUEST_CLOSE_SHEETDIALOG,
  }
}






