/*
 * NavTabs Messages
 *
 * This contains all the text for the NavTabs component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavTabs';

export default defineMessages({
  tabhome: {
    id: `${scope}.tabhome`,
    defaultMessage: 'Home',
  },

  tabcreate: {
    id: `${scope}.tabcreate`,
    defaultMessage: 'Create',
  },

  tabprofile: {
    id: `${scope}.tabprofile`,
    defaultMessage: 'Profile',
  },
});
