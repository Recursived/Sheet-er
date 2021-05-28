/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_GET_SHEETLIST,
  SUCCESS_GET_SHEETLIST
} from './constants';

export const initialState = {
  sheets_data: null,
  searchfilter: null,
  loading_sheets: false
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_GET_SHEETLIST:
        if (draft.searchfilter !== action.searchfilter){
          draft.searchfilter = action.searchfilter;
          draft.sheets_data = null;
          draft.loading_sheets = true;
        }
        break;
      case SUCCESS_GET_SHEETLIST:
        draft.sheets_data = action.data;
        draft.loading_sheets = false;
        break;
    }
  });

export default homePageReducer;
