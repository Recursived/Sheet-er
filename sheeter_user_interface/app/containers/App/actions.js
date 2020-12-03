/*
 *
 * App actions
 *
 */

import { 
  IS_LOGGED_OUT_SUCCESS, 
  IS_LOGGED_IN_SUCCESS,
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
  CLOSE_DIALOG_CONTACT,
  OPEN_DIALOG_CONTACT,
  REFRESH_TOKEN
} from './constants';

/**
 * Action to request a login. You should provide the uid and the backend.
 * @param {int|email} uid 
 * @param {string} backend 
 * @param {string} social_token token given by the social network 
 */
export function isRequestLoginAction(uid, backend, access_token){
  return {
    type : REQUEST_LOG_IN,
    uid : uid,
    backend : backend,
    social_token : access_token
  }
}


export function isRequestLogOutAction(){
  return {
    type: REQUEST_LOG_OUT
  }
}

/**
 * Action when the logout is successful
 */
export function isLoggedOutSuccessAction() {
  return {
    type: IS_LOGGED_OUT_SUCCESS,
  };
}

/**
 * Action to set the user when api call is successful, otherwise you should send message to snackbar
 * @param {object} json_user 
 */
export function isLoggedSuccessAction(json_user){
  return {
    type: IS_LOGGED_IN_SUCCESS,
    user : json_user
  }
}

/**
 * Action used to refresh an object whenever the access token is expired
 * @param {object} refresh_data 
 */
export function isRefreshAction(refresh_data){
  return {
    type: REFRESH_TOKEN,
    refresh_data : refresh_data
  }
}


export function openContactDialogAction(){
    return {
      type : OPEN_DIALOG_CONTACT
    }
}

export function closeContactDialogAction(){
  return {
    type : CLOSE_DIALOG_CONTACT
  }
}