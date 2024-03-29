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

  routeLandingpage: {
    id: `${scope}.routeLandingpage`,
    defaultMessage: 'Welcome on Sheeter !',
  },

  jumbotron: {
    id: `${scope}.jumbotron`,
    defaultMessage: 'Drag & drop your sheet. Give them a new life !',
  }

});
