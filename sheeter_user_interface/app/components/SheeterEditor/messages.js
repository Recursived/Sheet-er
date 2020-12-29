/*
 * SheeterEditor Messages
 *
 * This contains all the text for the SheeterEditor component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SheeterEditor';

export default defineMessages({
  word: {
    id: `${scope}.word`,
    defaultMessage:   "{counter, plural, =0 {no words} =1 {# word} other {# words}}",
  },


});
