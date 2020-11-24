/*
 * NavDropMenu Messages
 *
 * This contains all the text for the NavDropMenu component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavDropMenu';

export default defineMessages({
  logoutbutton: {
    id: `${scope}.logoutbutton`,
    defaultMessage: 'Log out',
  },

  changethemebutton: {
    id: `${scope}.changethemebutton`,
    defaultMessage: 'Change theme',
  },

  settingsbutton: {
    id: `${scope}.settingsbutton`,
    defaultMessage: 'Access settings',
  },

  contactus: {
    id: `${scope}.contactus`,
    defaultMessage: 'Contact us',
  },
});
