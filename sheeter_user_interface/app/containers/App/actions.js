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
  REFRESH_TOKEN,
  GET_CATEGORIES_SUCCESS,
  REQUEST_CATEGORIES,
  SEND_RESPONSE_SUCCESS,
  REQUEST_SEND_RESPONSE
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

/**
 * Open the contact us dialog
 */
export function openContactDialogAction(){
    return {
      type : OPEN_DIALOG_CONTACT
    }
}

/**
 * Close the contact us dialog
 */
export function closeContactDialogAction(){
  return {
    type : CLOSE_DIALOG_CONTACT
  }
}

/**
 * Action used to request a list of categories
 */
export function isRequestCategoriesAction(){
  return {
    type : REQUEST_CATEGORIES
  }
}

/**
 * Action used to set the categories after a successful call to the api
 * @param {Array} categories 
 */
export function isCategoriesSuccessAction(categories){
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories: categories
  }
}

/**
 * Action used to make request to send a message
 * @param {object} message 
 */
export function isSendResponseRequestAction(message){
  return {
    type: REQUEST_SEND_RESPONSE,
    message: message
  }
}

/**
 * Action used to validate the success of the response
 */
export function isSendResponseSuccessAction(){
  return {
    type: SEND_RESPONSE_SUCCESS,
  }
}

