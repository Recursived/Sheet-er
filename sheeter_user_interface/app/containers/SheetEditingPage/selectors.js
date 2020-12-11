import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sheetEditingPage state domain
 */

const selectSheetEditingPageDomain = state =>
  state.sheetEditingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SheetEditingPage
 */

const makeSelectSheetEditingPage = () =>
  createSelector(
    selectSheetEditingPageDomain,
    substate => substate,
  );

export default makeSelectSheetEditingPage;
export { selectSheetEditingPageDomain };
