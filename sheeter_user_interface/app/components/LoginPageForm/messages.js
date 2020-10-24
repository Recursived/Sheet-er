/*
 * LandingPageForm Messages
 *
 * This contains all the text for the LandingPageForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LandingPageForm';

export default defineMessages({
  logintitle: {
    id: `${scope}.logintitle`,
    defaultMessage: 'Sign in with',
  },
  
  facebooklogin: {
    id: `${scope}.facebooklogin`,
    defaultMessage: 'Facebook',
  },

  facebooktooltip: {
    id: `${scope}.facebooktooltip`,
    defaultMessage: 'Sign in with Facebook',
  },

  googlelogin: {
    id: `${scope}.googlelogin`,
    defaultMessage: 'Google',
  },

  googletooltip: {
    id: `${scope}.googletooltip`,
    defaultMessage: 'Sign in with Google',
  },
});
