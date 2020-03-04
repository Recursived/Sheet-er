import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const makeSelectIsLoggedIn = () => 
    createSelector(
      selectHomePageDomain,
      state => state.loggedIn
    )

export default makeSelectHomePage;
export {
  selectHomePageDomain, 
  makeSelectHomePage 
};
