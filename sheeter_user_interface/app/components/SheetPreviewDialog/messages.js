/*
 * SheetPreviewDialog Messages
 *
 * This contains all the text for the SheetPreviewDialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SheetPreviewDialog';

export default defineMessages({
  titledialog: {
    id: `${scope}.titledialog`,
    defaultMessage: 'Link a Sheet',
  },

  emptysheetdialog: {
    id: `${scope}.emptysheetdialog`,
    defaultMessage: 'There a no sheet available',
  },

  loadingtext: {
    id: `${scope}.loadingtext`,
    defaultMessage: 'Loading...',
  }
  
});
