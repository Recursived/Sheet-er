import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the themeProvider state domain
 */

const selectThemeProviderDomain = state => state.theme || initialState;


/**
 * Default selector used by ThemeProvider
 */

const makeSelectThemeProvider = () =>
  createSelector(
    selectThemeProviderDomain,
    substate => substate.theme,
);


export { makeSelectThemeProvider, selectThemeProviderDomain };
