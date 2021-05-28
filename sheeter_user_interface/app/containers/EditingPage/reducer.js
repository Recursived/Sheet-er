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
  REQUEST_SET_DESCRSHEET,
  REQUEST_SET_TYPESHEET,
  SUCCESS_ADD_SHEET,
  SUCCESS_DELETE_SHEET,
  REQUEST_ADD_SHEET,
  REQUEST_DELETE_SHEET,
  REQUEST_SET_LINKSHEET,
  REQUEST_OPEN_DIALOGLINK,
  SUCCESS_ADD_LINKSHEET,
  SUCCESS_EDIT_MYSHEET
} from './constants';

export const initialState = {
  // Used for combo
  sheet_types: [],
  sheet_tags: [],

  filter_tag: null, // Used to do search against tag API
  add_tag: null, // Used to add the tag in the SHEET API

  // Used to manage the current edited sheet
  editor_content_sheet: null,
  title_sheet: null,
  locale_sheet: null,
  descr_sheet: null,
  id_sheet: null,
  type_sheet: null,
  tags_sheet: [],
  link_id_sheet: null,
  // flag when making an action on sheet
  sheet_loading: false,
  permanent_delete: false,
  sheet_modified: false,
  // List of linkable sheets
  link_sheets_data: null,
  // Misc state elems
  link_dialog_open: false,


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
        draft.sheet_modified = true;
        draft.tags_sheet = action.response;
        break;
      case REQUEST_SET_EDITORCONTENT:
        draft.sheet_modified = true;
        draft.editor_content_sheet = action.content;
        break;
      case REQUEST_SET_TITLESHEET:
        draft.sheet_modified = true;
        draft.title_sheet = action.title;
        break;
      case REQUEST_SET_LOCALESHEET:
        draft.sheet_modified = true;
        draft.locale_sheet = action.locale;
        break;
      case REQUEST_SET_TYPESHEET:
        draft.sheet_modified = true;
        draft.type_sheet = action.sheet_type;
        draft.link_sheets_data = null;
        draft.link_id_sheet = null;
        break;
      case REQUEST_SET_DESCRSHEET:
        draft.descr_sheet = action.descr_sheet
        draft.sheet_modified = true;
        break;
      case REQUEST_SET_LINKSHEET:
        draft.link_id_sheet = action.link_id;
        draft.sheet_modified = true;
        break;
      case REQUEST_ADD_SHEET:
        draft.sheet_modified = false;
        draft.sheet_loading = true;
        break;
      case SUCCESS_ADD_SHEET:
        draft.sheet_modified = false;
        draft.sheet_loading = false;
        draft.id_sheet = action.id;
        break;
      case REQUEST_DELETE_SHEET:
        draft.permanent_delete = action.permanent;
        break;
      case SUCCESS_DELETE_SHEET:
        draft.id_sheet = null;
        draft.title_sheet = null;
        draft.type_sheet = null;
        draft.descr_sheet = null;
        draft.editor_content_sheet = null;
        draft.link_id_sheet = null;
        draft.tags_sheet = [];
        break;
      case REQUEST_OPEN_DIALOGLINK:
        draft.link_dialog_open = action.boolean;
        break;
      case SUCCESS_ADD_LINKSHEET:
        draft.link_sheets_data = action.link_sheet;
        break;
      case SUCCESS_EDIT_MYSHEET:
        draft.editor_content_sheet = JSON.parse(action.sheet.content);
        draft.title_sheet = action.sheet.title;
        draft.locale_sheet = action.sheet.locale;
        draft.descr_sheet = action.sheet.descr;
        draft.id_sheet = action.sheet.id;
        draft.type_sheet = action.sheet.subject;
        draft.tags_sheet =action.sheet.tags;        
        draft.link_id_sheet = action.sheet.next_sheet;
    }
  });

export default editingPageReducer;
