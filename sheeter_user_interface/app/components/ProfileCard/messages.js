/*
 * ProfileCard Messages
 *
 * This contains all the text for the ProfileCard component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ProfileCard';

export default defineMessages({

  profileroute: {
    id: `${scope}.profileroute`,
    defaultMessage: 'Profile - {name}',
  }
});
