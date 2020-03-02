/*
 *
 * HomePage actions
 *
 */

import { IS_LOGGED_IN } from './constants';

export function isLogged() {
  return {
    type: IS_LOGGED_IN,
  };
}
