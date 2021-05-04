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
  next_sheet: null,
  title: null,
  subject: null, // Should call api to get the label
  mark: null,
  tags: [], // Should call the api to get the labels 
  creation_date: null,
  plagiarism_rate: null,
  locale: null,
  author: null,
  score: 0,
  difficulty_level: null,
  visibility: 'PU',
  state: 'D',
  has_exercice: false,
  descr: null,
  nb_click : 0
};

/* eslint-disable default-case, no-param-reassign */
const sheetPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_GET_SHEETINFO:
        draft.id_sheet = action.id;
        break;
      case SUCCESS_GET_SHEETINFO:
        draft.id_sheet = action.response.id;
        draft.title = action.response.title;
        draft.next_sheet = action.response.next_sheet;
        draft.content = action.response.content;
        draft.subject = action.response.subject;
        draft.mark = action.response.mark;
        draft.tags = action.response.tags;
        draft.creation_date = action.response.creation_date;
        draft.plagiarism_rate = action.response.plagiarism_rate;
        draft.locale = action.response.locale;
        draft.author = action.response.author;
        draft.score = action.response.score;
        draft.difficulty_level = action.response.difficulty_level;
        draft.visibility =  action.response.visibility;
        draft.state = action.response.state;
        draft.has_exercice = action.response.has_exercice;
        draft.descr = action.response.descr;
        draft.nb_click = action.response.nb_click;
        
        break;
    }
  });

export default sheetPageReducer;
