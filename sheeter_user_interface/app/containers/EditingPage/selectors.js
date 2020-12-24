import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editingPage state domain
 */

const selectEditingPageDomain = state => state.editingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditingPage
 */

const makeSelectEditingPage = () =>
  createSelector(
    selectEditingPageDomain,
    substate => substate,
  );

export default makeSelectEditingPage;
export { selectEditingPageDomain };
