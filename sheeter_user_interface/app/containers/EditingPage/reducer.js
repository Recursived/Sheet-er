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
  SUCCESS_ADD_SHEET,
  SUCCESS_DELETE_SHEET
 } from './constants';

export const initialState = {
  // Used for combo
  sheet_types : [],
  sheet_tags : [],
  
  filter_tag: null, // Used to do search against tag API
  add_tag: null, // Used to add the tag in the SHEET API
  
  // Used to manage the current edited sheet
  editor_content_sheet: null,
  title_sheet: null,
  locale_sheet: null,
  id_sheet: null,
  type_sheet: null,
  tags_sheet: [],


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
        draft.add_tag = action.tags;
        break;
      case SUCCESS_ADD_SHEETTAG:
        draft.tags_sheet = action.response;
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
      case SUCCESS_ADD_SHEET:
        draft.id_sheet = action.id;
        break;
      case SUCCESS_DELETE_SHEET:
        draft.id_sheet = null;
        break;
    }
  });

export default editingPageReducer;
