/*
 *
 * MobileSheetPage reducer
 *
 */
import produce from 'immer';
import { 
  REQUEST_GET_SHEET,
  SUCCESS_GET_SHEET
} from './constants';

export const initialState = {
  id_sheet: null,
  token: null,
  sheet: {}

};

/* eslint-disable default-case, no-param-reassign */
const mobileSheetPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_GET_SHEET:
        draft.id_sheet = action.id_sheet;
        draft.token = action.token;
        break;
      case SUCCESS_GET_SHEET:
        draft.sheet = action.sheet;
        break;
    }
  });

export default mobileSheetPageReducer;
