/*
 * App Messages
 *
 * This contains all the text for the App container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.App';

export default defineMessages({
  hasToLogin: {
    id: `${scope}.hasToLogin`,
    defaultMessage: 'To access the home page, you have to log in !',
  },

  logoutSuccess: {
    id: `${scope}.logoutSuccess`,
    defaultMessage: 'You\'ve been successfully logged out !',
  }

});
