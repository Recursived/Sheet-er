import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mobileSheetPage state domain
 */

const selectMobileSheetPageDomain = state =>
  state.mobileSheetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MobileSheetPage
 */

const makeSelectMobileSheetPage = () =>
  createSelector(
    selectMobileSheetPageDomain,
    substate => substate,
  );

export default makeSelectMobileSheetPage;
export { selectMobileSheetPageDomain };
