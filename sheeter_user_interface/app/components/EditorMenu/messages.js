/*
 * EditorMenu Messages
 *
 * This contains all the text for the EditorMenu component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.EditorMenu';

export default defineMessages({
  titlesheet: {
    id: `${scope}.titlesheet`,
    defaultMessage: 'Title',
  },

  localesheet: {
    id: `${scope}.localesheet`,
    defaultMessage: 'Locale',
  },

  labelsheettype: {
    id: `${scope}.labelsheettype`,
    defaultMessage: 'Subject',
  },

});
