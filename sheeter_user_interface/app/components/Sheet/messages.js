/*
 * Sheet Messages
 *
 * This contains all the text for the Sheet component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Sheet';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Sheet component!',
  },
});
