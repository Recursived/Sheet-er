/*
 * SheetDisplayer Messages
 *
 * This contains all the text for the SheetDisplayer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SheetDisplayer';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SheetDisplayer component!',
  },

  labelnextsheetbutton: {
    id: `${scope}.labelnextsheetbutton`,
    defaultMessage: 'Go to next sheet',
  },
});
