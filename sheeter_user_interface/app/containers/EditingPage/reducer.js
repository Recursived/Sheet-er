/*
 *
 * EditingPage reducer
 *
 */
import produce from 'immer';
import { 
  SUCCESS_SHEET_TYPE,
  REQUEST_SHEET_TAG,
  SUCCESS_SHEET_TAG,
  REQUEST_ADD_SHEETTAG,
  SUCCESS_ADD_SHEETTAG,
  RESET_ADD_SHEETTAG
 } from './constants';

export const initialState = {
  sheet_types : [],
  sheet_tags : [],
  filter_tag: null, // Used to do search against tag API
  add_tag: null, // Used to add the tag in the SHEET API
  response_add_tag: null,
};

/* eslint-disable default-case, no-param-reassign */
const editingPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUCCESS_SHEET_TYPE:
        draft.sheet_types = action.sheet_types;
        break;
      case REQUEST_SHEET_TAG:
        draft.filter_tag = action.filter;
        break;
      case SUCCESS_SHEET_TAG:
        draft.sheet_tags = action.tags;
        break;
      case REQUEST_ADD_SHEETTAG:
        draft.add_tag = action.add_tag;
        break;
      case SUCCESS_ADD_SHEETTAG:
        draft.response_add_tag = action.response;
        break;
      case RESET_ADD_SHEETTAG:
        draft.add_tag = null;
        draft.response_add_tag = null;
    }
  });

export default editingPageReducer;
