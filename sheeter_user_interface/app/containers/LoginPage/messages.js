/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Log into Sheeter',
  },

  routeLoginpage: {
    id: `${scope}.routeLoginpage`,
    defaultMessage: 'Log into Sheeter'
  }
});
