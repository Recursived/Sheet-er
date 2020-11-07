import { createSelector } from 'reselect';

const selectGlobal = state => state.global;

const makeSelectGlobal = () =>
  createSelector(
    selectGlobal,
    (globalState) => globalState,
  );



const makeSelectLocation = () =>
  createSelector(
    selectGlobal,
    (globalState) => globalState.location,
  );

export {
  makeSelectGlobal,
  makeSelectLocation
 };
