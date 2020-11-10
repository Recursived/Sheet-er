/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import {  IS_LOGGED_IN_SUCCESS, IS_LOGGED_OUT_SUCCESS, REQUEST_LOG_IN } from './constants';

export const initialState = {
  conn_info : {
    backend : null,
    uid : null,
    social_token: null
  },
  loggedIn: false,
  user_info : null,
  
};

/* eslint-disable default-case, no-param-reassign */
const globalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_LOG_IN: 
        draft.conn_info.uid = action.uid;
        draft.conn_info.backend = action.backend
        draft.conn_info.social_token = action.social_token;
        break;
      case IS_LOGGED_IN_SUCCESS:
        draft.user_info = action.user;
        draft.loggedIn = true;
        return draft;
      case IS_LOGGED_OUT_SUCCESS:
        draft.user_info = {};
        draft.loggedIn = false;
        return draft;
    }
  });

export default globalReducer;
