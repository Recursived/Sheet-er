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

  toomanywords: {
    id: `${scope}.toomanywords`,
    defaultMessage:   "You've gone pass the '500 words' threshold, try be more concise to improve readability !",
  },

  removecontent: {
    id: `${scope}.removeContent`,
    defaultMessage: "Remove",
  },

  donecontentvalid: {
    id: `${scope}.donecontentvalid`,
    defaultMessage: "Valid content",
  },

  donecontentinvalid: {
    id: `${scope}.donecontentinvalid`,
    defaultMessage: "Invalid TeX",
  },




});
