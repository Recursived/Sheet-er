/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_SET_TYPE,
  SUCCESS_GET_SHEETTYPE,
  SUCCESS_GET_MYSHEETS,
  REQUEST_SET_SHEETDATA,
  REQUEST_CLOSE_SHEETDIALOG,
  REQUEST_OPEN_SHEETDIALOG
} from './constants';

export const initialState = {
  sheet_list: null,
  type_list: [],
  type: null,
  sheet: null,
  sheet_dialog: false
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_SET_TYPE:
        draft.sheet_list = null;
        draft.type = action.sheettype;
        break;
      case SUCCESS_GET_SHEETTYPE:
        draft.type_list = action.sheettypes;
        break;
      case SUCCESS_GET_MYSHEETS:
        draft.sheet_list = action.data;
        break;
      case REQUEST_SET_SHEETDATA:
        draft.sheet = action.sheet;
        break;
      case REQUEST_CLOSE_SHEETDIALOG:
        draft.sheet_dialog = false;
        break;
      case REQUEST_OPEN_SHEETDIALOG:
        draft.sheet_dialog = true;
        break;

    }
  });

export default profilePageReducer;
