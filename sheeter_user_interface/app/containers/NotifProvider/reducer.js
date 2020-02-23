/*
 *
 * ThemeProvider reducer
 *
 */
import produce from 'immer';
import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from './constants';

export const initialState = {
  notifications : []
};

/* eslint-disable default-case, no-param-reassign */
const notifProviderReducer = (state = initialState, action) =>
  produce(state, draft  => {
    switch (action.type) {
      case ENQUEUE_SNACKBAR:
        draft = {
          ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    },
                ],
        }
        break;
      case REMOVE_SNACKBAR:
        draft = {
          ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
        }
      default:
        break;
    }
  });

export default notifProviderReducer;
