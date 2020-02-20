/*
 * LocaleSelector Messages
 *
 * This contains all the text for the LocaleSelector component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LocaleSelector';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Language',
  },

  tooltip: {
    id: `${scope}.tooltip`,
    defaultMessage: 'Choose a language'
  }
});
