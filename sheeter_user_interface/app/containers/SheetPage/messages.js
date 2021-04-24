/*
 * SheetPage Messages
 *
 * This contains all the text for the SheetPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SheetPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SheetPage container!',
  },

  sheetroute: {
    id: `${scope}.sheetroute`,
    defaultMessage: 'Sheet : {title}',
  },

  errorretrievesheet: {
    id: `${scope}.errorretrievesheet`,
    defaultMessage: 'We could not retrieve this sheet\'s data',
  }
});
