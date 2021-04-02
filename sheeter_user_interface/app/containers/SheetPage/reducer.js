/*
 *
 * SheetPage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_GET_SHEETINFO,
  SUCCESS_GET_SHEETINFO
} from './constants';

export const initialState = {
  id_sheet: null,
  content: null,
  subject: null, // Should call api to get the label
  mark: null,
  tags: [], // Should call the api to get the labels 
  creation_date: null,
  plagiarism_rate: null,
  locale: null,
};

/* eslint-disable default-case, no-param-reassign */
const sheetPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_GET_SHEETINFO:
        draft.id_sheet = action.id;
        break;
      case SUCCESS_GET_SHEETINFO:
        break;
    }
  });

export default sheetPageReducer;
