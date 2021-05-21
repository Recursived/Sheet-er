/*
 * SettingsPage Messages
 *
 * This contains all the text for the SettingsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsPage';

export default defineMessages({
  routeSettingsPage: {
    id: `${scope}.routeSettingsPage`,
    defaultMessage: 'Settings',
  },

  tablanguage: {
    id: `${scope}.tablanguage`,
    defaultMessage: 'Language',
  },

  tabtheme: {
    id: `${scope}.tabtheme`,
    defaultMessage: 'Theme',
  },

  tablogout: {
    id: `${scope}.tablogout`,
    defaultMessage: 'Log out',
  },

  tababout: {
    id: `${scope}.tababout`,
    defaultMessage: 'About / Help',
  },
});
