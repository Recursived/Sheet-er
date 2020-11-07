/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import {  IS_LOGGED_IN_SUCCESS, IS_LOGGED_OUT_SUCCESS } from './constants';

export const initialState = {
  loggedIn: false,
  user : null
};

/* eslint-disable default-case, no-param-reassign */
const globalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case IS_LOGGED_IN_SUCCESS:
        draft.user = action.user;
        draft.loggedIn = true;
        break;
      case IS_LOGGED_OUT_SUCCESS:
        draft.user = action.user;
        draft.loggedIn = true;
    }
  });

export default globalReducer;
