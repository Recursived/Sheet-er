import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the themeProvider state domain
 */

const selectNotifProviderDomain = state => state.notifications || initialState;


/**
 * Default selector used by ThemeProvider
 */

const makeSelectNotifProvider = () =>
  createSelector(
    selectNotifProviderDomain,
    substate => substate.notifications,
);


export { makeSelectNotifProvider, selectNotifProviderDomain };
