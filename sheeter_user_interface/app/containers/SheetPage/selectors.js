import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sheetPage state domain
 */

const selectSheetPageDomain = state => state.sheetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SheetPage
 */

const makeSelectSheetPage = () =>
  createSelector(
    selectSheetPageDomain,
    substate => substate,
  );

export default makeSelectSheetPage;
export { selectSheetPageDomain };
