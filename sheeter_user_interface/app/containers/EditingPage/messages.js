/*
 * EditingPage Messages
 *
 * This contains all the text for the EditingPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditingPage';

export default defineMessages({

  editingroute: {
    id: `${scope}.editingroute`,
    defaultMessage: 'Edit your sheet',
  },

  errorsheettypes: {
    id: `${scope}.errorsheettypes`,
    defaultMessage: 'Ouch... We could not retrieve the sheet types',
  },

  errorsheettag: {
    id: `${scope}.errorsheettag`,
    defaultMessage: 'Oh no... We could not retrieve the tags',
  },

  erroraddsheettag: {
    id: `${scope}.erroraddsheettag`,
    defaultMessage: 'We faced a problem trying to add your tag',
  },


});
