/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { IS_LOGGED_IN, GET_SHEETS, GET_SHEETS_SUCCESS } from './constants';

export const initialState = {
  loggedIn: false,
  sheets: []
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case IS_LOGGED_IN:
        draft.loggedIn = true;
        break;
      case GET_SHEETS_SUCCESS:
        draft.sheets = action.sheets;
        break;
    }
  });

export default homePageReducer;
