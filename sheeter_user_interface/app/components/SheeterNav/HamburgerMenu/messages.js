/*
 * HamburgerMenu Messages
 *
 * This contains all the text for the HamburgerMenu component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HamburgerMenu';

export default defineMessages({
  homepagemessage: {
    id: `${scope}.homepagemessage`,
    defaultMessage: 'Homepage',
  },

  editmessage: {
    id: `${scope}.editmessage`,
    defaultMessage: 'Create/Edit Sheet',
  },

  profilemessage: {
    id: `${scope}.profilemessage`,
    defaultMessage: 'Profile',
  },
});
