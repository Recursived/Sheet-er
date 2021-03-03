/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import {  
  CLOSE_DIALOG_CONTACT, 
  IS_LOGGED_IN_SUCCESS, 
  IS_LOGGED_OUT_SUCCESS, 
  OPEN_DIALOG_CONTACT, 
  REQUEST_LOG_IN,
  REFRESH_TOKEN, 
  GET_CATEGORIES_SUCCESS,
  REQUEST_SEND_RESPONSE,
  SEND_RESPONSE_SUCCESS
} from './constants';

export const initialState = {
  conn_info : {
    backend : null,
    uid : null,
    social_token: null
  },
  user_info : null,
  loggedIn: false,
  contactDialog: false,
  contactMessage: null,
  categories : []
  
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
        break;
      case IS_LOGGED_OUT_SUCCESS:
        draft.user_info = null;
        draft.conn_info =  {
          backend : null,
          uid : null,
          social_token: null
        },
        draft.loggedIn = false;
        break;
      case OPEN_DIALOG_CONTACT:
        draft.contactDialog = true;
        break;
      case CLOSE_DIALOG_CONTACT:
        draft.contactDialog = false;
        break;
      case REFRESH_TOKEN:
        if (draft.user_info !== null){
          draft.user_info.token = action.refresh_data.refresh_token;
          draft.user_info.access_token.token = action.refresh_data.access_token;
          let date =  new Date(Date.now() + action.refresh_data.expires_in * 1000);
          draft.user_info.access_token.expires = date;
        }
        break;
      case GET_CATEGORIES_SUCCESS:
        draft.categories = action.categories;
        break;
      case REQUEST_SEND_RESPONSE:
        draft.contactMessage = action.message;
        break;
      case SEND_RESPONSE_SUCCESS: 
        draft.contactMessage = null;
        break;

    }
  });

export default globalReducer;

