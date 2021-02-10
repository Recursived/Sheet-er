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

  tooltipsave: {
    id: `${scope}.tooltipsave`,
    defaultMessage: 'Save',
  },

  nooptionslabel: {
    id: `${scope}.nooptionslabel`,
    defaultMessage: 'No options',
  },

  loadinglabel: {
    id: `${scope}.loadinglabel`,
    defaultMessage: 'Loading...',
  },

  tagplaceholder: {
    id: `${scope}.tagplaceholder`,
    defaultMessage: 'Choose tags or create your own...',
  },

  taglabel: {
    id: `${scope}.taglabel`,
    defaultMessage: 'Tags',
  },

  addtaglabel: {
    id: `${scope}.addtaglabel`,
    defaultMessage: 'Add \'{tag}\'',
  },

  classictabbuttons: {
    id: `${scope}.classictabbuttons`,
    defaultMessage: 'Classic',
  },

});
