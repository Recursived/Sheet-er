/*
 * MainSheetDisplay Messages
 *
 * This contains all the text for the MainSheetDisplay component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MainSheetDisplay';

export default defineMessages({
  nosheettext: {
    id: `${scope}.nosheettext`,
    defaultMessage: 'No sheets available',
  },

  loadingtext: {
    id: `${scope}.loadingtext`,
    defaultMessage: 'Loading...',
  },

});
