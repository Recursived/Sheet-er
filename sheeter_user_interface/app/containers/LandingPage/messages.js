/*
 * LandingPage Messages
 *
 * This contains all the text for the LandingPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LandingPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LandingPage container!',
  },
  title:{
    id:`${scope}.title`,
    defaultMessage: 'Login - Sheeter',
  },
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
  }
});
