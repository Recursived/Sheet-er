/*
 *
 * ThemeProvider reducer
 *
 */

import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR, CLOSE_SNACKBAR } from './constants';

export const initialState = {
  notifications: [],
};

/* eslint-disable default-case, no-param-reassign */
const notifProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification },
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };

    default:
      return state;
  }
};

export default notifProviderReducer;
