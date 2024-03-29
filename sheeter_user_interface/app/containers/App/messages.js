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
  },

  loginError: {
    id: `${scope}.loginError`,
    defaultMessage: 'We\'ve encoutered a problem during log in, please try again later !',
  },

  problemRefreshToken: {
    id: `${scope}.problemRefreshToken`,
    defaultMessage: 'We\'ve encoutered a problem with your account, you may not be able to use some functionalities !',
  },

  categoriesError: {
    id: `${scope}.categoriesError`,
    defaultMessage: 'Oops ! We could not retrieve the categories...',
  },

  messageError: {
    id: `${scope}.messageError`,
    defaultMessage: 'Oops ! We could not send the message...',
  },

  messageSuccess: {
    id: `${scope}.messageSuccess`,
    defaultMessage: 'We\'ve delivered your message to the Sheeter team',
  },
  

});
