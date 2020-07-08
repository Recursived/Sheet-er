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
    defaultMessage: 'Log in',
  },
  facebooklogin: {
    id: `${scope}.facebooklogin`,
    defaultMessage: 'Login with edgrzsth',
  },
  googlelogin: {
    id: `${scope}.googlelogin`,
    defaultMessage: 'Log in with google',
  },
});
