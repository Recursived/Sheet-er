/*
 *
 * ThemeProvider reducer
 *
 */
import produce from 'immer';

import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { CHANGE_THEME } from './constants';

// Function to check user's theme preference
const getThemeFromPreference = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkMode !== null & prefersDarkMode !== null){
    return prefersDarkMode.matches ? "dark" : "light";
  }

  return "dark";
};


export const initialState = {
  themeColor: getThemeFromPreference(),
};

/* eslint-disable default-case, no-param-reassign */
const themeProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_THEME:
        draft.themeColor = action.themeColor;
        break;
    }
  });

export default themeProviderReducer;
