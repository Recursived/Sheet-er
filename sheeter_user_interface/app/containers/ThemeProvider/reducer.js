/*
 *
 * ThemeProvider reducer
 *
 */
import produce from 'immer';
import { CHANGE_THEME } from './constants';

import { createMuiTheme } from '@material-ui/core/styles';

// Function to check user's theme preference
const getThemeFromPreference = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const theme = createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    });

  return theme;
}

export const initialState = {
  theme: getThemeFromPreference()
};

/* eslint-disable default-case, no-param-reassign */
const themeProviderReducer = (state = initialState, action) =>
  produce(state,  draft => {
    switch (action.type) {
      case CHANGE_THEME:
        draft.theme = action.theme
        break;
    }
  });

export default themeProviderReducer;
