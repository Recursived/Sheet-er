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

const makeSelectSheetTypes = () =>
  createSelector(
    selectEditingPageDomain,
    substate => substate.sheet_types
  );

const makeSelectSheetTags = () =>
  createSelector(
    selectEditingPageDomain,
    substate => substate.sheet_tags
  );


const makeSelectFilterTag = () =>
  createSelector(
    selectEditingPageDomain,
    substate => substate.filter_tag
  );

const makeSelectAddTag = () =>
  createSelector(
    selectEditingPageDomain,
    substate => substate.add_tag
  );

const makeSelectResponseAddTag = () =>
  createSelector(
    selectEditingPageDomain,
    substate => substate.response_add_tag
  );


export default makeSelectEditingPage;
export {
  selectEditingPageDomain,
  makeSelectSheetTypes,
  makeSelectSheetTags,
  makeSelectFilterTag,
  makeSelectAddTag,
  makeSelectResponseAddTag
};
