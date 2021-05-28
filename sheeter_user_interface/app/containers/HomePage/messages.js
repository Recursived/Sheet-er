/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePage container!',
  },

  hasToLogin: {
    id: `${scope}.hasToLogin`,
    defaultMessage: 'To access this page, you have to log in !',
  },

  routeHomepage: {
    id: `${scope}.routeHomepage`,
    defaultMessage: 'Sheeter - Homepage',
  },

  errorsearchsheet: {
    id: `${scope}.errorsearchsheet`,
    defaultMessage: 'An error occured while trying to look for Sheets...',
  }
});
