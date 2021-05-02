/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_SET_TYPE,
  SUCCESS_GET_SHEETTYPE,
  SUCCESS_GET_MYSHEETS
} from './constants';

export const initialState = {
  sheet_list: null,
  type_list: [],
  type: null,
  sheet: null
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
    }
  });

export default profilePageReducer;
