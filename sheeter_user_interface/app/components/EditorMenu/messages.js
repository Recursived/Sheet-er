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

  sciencetabbuttons: {
    id: `${scope}.sciencetabbuttons`,
    defaultMessage: 'Science',
  },

  deletesheetbutton: {
    id: `${scope}.deletesheetbutton`,
    defaultMessage: 'Delete',
  },

  tooltipdeletesheetbutton: {
    id: `${scope}.tooltipdeletesheetbutton`,
    defaultMessage: 'Delete current Sheet',
  },

  linksheetbutton: {
    id: `${scope}.linksheetbutton`,
    defaultMessage: 'Link',
  },

  tooltiplinksheetbutton: {
    id: `${scope}.tooltiplinksheetbutton`,
    defaultMessage: 'Link this Sheet to another one',
  },

  sheethistorybutton: {
    id: `${scope}.sheethistorybutton`,
    defaultMessage: 'Sheet history',
  },

  tooltipsheethistorybutton: {
    id: `${scope}.tooltipsheethistorybutton`,
    defaultMessage: 'Edit a previously created Sheet',
  },
  

});
