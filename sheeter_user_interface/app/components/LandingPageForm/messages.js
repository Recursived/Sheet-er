/*
 * LandingPageForm Messages
 *
 * This contains all the text for the LandingPageForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LandingPageForm';

export default defineMessages({
  name : {
    id:`${scope}.name`,
    defaultMessage: 'Name',
  },
  firstname : {
    id:`${scope}.firstname`,
    defaultMessage: 'Firstname',
  },
  email : {
    id:`${scope}.email`,
    defaultMessage : 'Email',
  },
  signin : {
    id:`${scope}.signin`,
    defaultMessage : 'Sign in',
  },
  signup : {
    id:`${scope}.signup`,
    defaultMessage : 'Sign up',
  }
});
