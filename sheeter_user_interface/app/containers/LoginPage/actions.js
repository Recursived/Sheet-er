/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './constants';

export function loginRequestAction() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccesAction(userInfo){
  return {
    type: LOGIN_SUCCESS,
    userInfo
  }
}

export function loginFailureAction(error){
  return {
    type: LOGIN_FAILURE,
    error
  }
}
