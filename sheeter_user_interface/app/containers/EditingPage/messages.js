/*
 * EditingPage Messages
 *
 * This contains all the text for the EditingPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditingPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the EditingPage container!',
  },

  editingroute: {
    id: `${scope}.editingroute`,
    defaultMessage: 'Edit your sheet',
  },
});
