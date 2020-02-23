/*
 *
 * ThemeProvider actions
 *
 */

import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from './constants';


export const enqueueSnackbar = notification => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
      key: new Date().getTime() + Math.random(),
      ...notification,
  },
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});
