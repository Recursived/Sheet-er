import { createSelector } from 'reselect';
import { initialState } from './reducer'

const selectGlobal = state => state.global || initialState;
const selectRouterPageDomain = state => state.router || initialState;


/**
 * Global selector for the App substate
 */
const makeSelectGlobal = () =>
  createSelector(
    selectGlobal,
    substate => substate,
  );


/**
 * Specific selectors
 */
const makeSelectPathname = () =>
  createSelector(
    selectRouterPageDomain,
    substate => substate.location.pathname,
  );

const makeSelectLoggedIn = () =>
  createSelector(
    selectGlobal,
    substate => substate.loggedIn,
  );

const makeSelectConnInfo = () =>
  createSelector(
    selectGlobal,
    substate => substate.conn_info
  )


export {
  makeSelectGlobal,
  makeSelectPathname,
  makeSelectLoggedIn,
  makeSelectConnInfo
 };
