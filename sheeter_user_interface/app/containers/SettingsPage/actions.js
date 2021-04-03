/*
 *
 * SettingsPage actions
 *
 */

import {
  REQUEST_SETTINGS_CHANGE_PAGE
} from './constants';

export function requestSettingsChangePage(page) {
  return {
    type: REQUEST_SETTINGS_CHANGE_PAGE,
    page: page
  };
}
