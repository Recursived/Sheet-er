/*
 *
 * ThemeProvider actions
 *
 */

import { CHANGE_THEME } from './constants';

export function changeTheme(new_theme) {
  return {
    type: CHANGE_THEME,
    theme: new_theme
  };
}
