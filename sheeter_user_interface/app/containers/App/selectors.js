import { createSelector } from 'reselect';
import { initialState } from './reducer'

const selectGlobal = state => state.global || initialState;
const selectRouterPageDomain = state => state.router || initialState;

const makeSelectGlobal = () =>
  createSelector(
    selectGlobal,
    substate => substate,
  );



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



export {
  makeSelectGlobal,
  makeSelectPathname,
  makeSelectLoggedIn
 };
