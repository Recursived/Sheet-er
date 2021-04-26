/*
 * MobileSheetPage Messages
 *
 * This contains all the text for the MobileSheetPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MobileSheetPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MobileSheetPage container!',
  },

  mobilesheetroute: {
    id: `${scope}.mobilesheetroute`,
    defaultMessage: 'Sheet - mobile',
  },

  errordisplaysheet: {
    id: `${scope}.errordisplaysheet`,
    defaultMessage: 'Oops... We could not display the sheet',
  },
});
