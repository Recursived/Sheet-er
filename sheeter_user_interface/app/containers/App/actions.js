/*
 *
 * App actions
 *
 */

import { 
  IS_LOGGED_OUT_SUCCESS, 
  IS_LOGGED_IN_SUCCESS,
  REQUEST_LOG_IN
} from './constants';

/**
 * Action to request a login. You should provide the uid and the backend.
 * @param {int|email} uid 
 * @param {string} backend 
 */
export function isRequestLoginAction(uid, backend){
  return {
    type : REQUEST_LOG_IN,
    uid : uid,
    backend : backend
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

