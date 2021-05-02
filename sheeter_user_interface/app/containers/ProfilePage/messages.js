/*
 * ProfilePage Messages
 *
 * This contains all the text for the ProfilePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfilePage';

export default defineMessages({

  profileroute: {
    id: `${scope}.profileroute`,
    defaultMessage: 'Profile - {name}',
  },

  titlemysheetsection: {
    id: `${scope}.titlemysheetsection`,
    defaultMessage: 'My sheets',
  },

  errorsheettypes: {
    id: `${scope}.errorsheettypes`,
    defaultMessage: 'Ouch... We could not retrieve the sheet types',
  },

  errormysheets: {
    id: `${scope}.errormysheets`,
    defaultMessage: 'We could not retrieve your sheets',
  },

});
