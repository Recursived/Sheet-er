/*
 *
 * SettingsPage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_SETTINGS_CHANGE_PAGE
} from './constants';

export const initialState = {
  page: null
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_SETTINGS_CHANGE_PAGE:
        draft.page = action.page;
        break;
    }
  });

export default settingsPageReducer;
