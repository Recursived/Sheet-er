/*
 * FilterSheetType Messages
 *
 * This contains all the text for the FilterSheetType component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.FilterSheetType';

export default defineMessages({
  nooptionslabel: {
    id: `${scope}.nooptionslabel`,
    defaultMessage: 'No options',
  },

  loadinglabel: {
    id: `${scope}.loadinglabel`,
    defaultMessage: 'Loading...',
  },

  labelsheettype: {
    id: `${scope}.labelsheettype`,
    defaultMessage: 'Subject',
  },
});
