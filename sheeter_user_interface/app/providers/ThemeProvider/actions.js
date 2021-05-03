/*
 *
 * ThemeProvider actions
 *
 */

import { CHANGE_THEME } from './constants';

export function changeTheme(new_theme_color) {
  return {
    type: CHANGE_THEME,
    themeColor: new_theme_color,
  };
}
