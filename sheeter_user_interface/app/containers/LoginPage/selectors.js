import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;
const selectRouterPageDomain = state => state.router || initialState;


/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

/**
 * Selector used to retrieve the pathname
 */
const makeSelectPathname = () =>
    createSelector(
      selectRouterPageDomain,
      substate => substate.location.pathname
    )


export { 
  selectLoginPageDomain, 
  selectRouterPageDomain,
  makeSelectLoginPage,
  makeSelectPathname
};
