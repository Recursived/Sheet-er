/*
 *
 * EditingPage reducer
 *
 */
import produce from 'immer';
import { 
  SUCCESS_SHEET_TYPE
 } from './constants';

export const initialState = {
  sheet_types : []
};

/* eslint-disable default-case, no-param-reassign */
const editingPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUCCESS_SHEET_TYPE:
        draft.sheet_types = action.sheet_types;
        break;
    }
  });

export default editingPageReducer;
