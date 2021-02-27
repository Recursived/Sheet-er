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
  REQUEST_SET_EDITORCONTENT,
  REQUEST_SET_TITLESHEET,
  REQUEST_SET_LOCALESHEET,
  REQUEST_SET_IDSHEET,
  REQUEST_SET_TYPESHEET,
  REQUEST_SET_TAGSHEET,
 } from './constants';

export const initialState = {
  // Used for combo
  sheet_types : [],
  sheet_tags : [],
  
  filter_tag: null, // Used to do search against tag API
  add_tag: null, // Used to add the tag in the SHEET API
  response_add_tag: null, // Used to store the response the tag gave
  
  // Used to manage the current edited sheet
  editor_content_sheet: null,
  title_sheet: null,
  locale_sheet: null,
  id_sheet: null,
  type_sheet: null,
  tags_sheet: null,


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
      case REQUEST_SET_EDITORCONTENT:
        draft.editor_content_sheet = action.content;
        break;
      case REQUEST_SET_TITLESHEET:
        draft.title_sheet = action.title;
        break;
      case REQUEST_SET_LOCALESHEET:
        draft.locale_sheet = action.locale;
        break;
      case REQUEST_SET_IDSHEET:
        draft.id_sheet = action.id_sheet;
        break;
      case REQUEST_SET_TYPESHEET:
        draft.type_sheet = action.sheet_type;
        break;
      case REQUEST_SET_TAGSHEET:
        draft.tags_sheet = action.tags;
        break;
    }
  });

export default editingPageReducer;
