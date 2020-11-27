/*
 * ContactUsDialog Messages
 *
 * This contains all the text for the ContactUsDialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ContactUsDialog';

export default defineMessages({
  titledialog: {
    id: `${scope}.titledialog`,
    defaultMessage: 'Contact Sheeter',
  },

  sendbutton: {
    id: `${scope}.sendbutton`,
    defaultMessage: 'Send',
  },

  cancelbutton: {
    id: `${scope}.cancelbutton`,
    defaultMessage: 'Cancel',
  },

  labeltextfield: {
    id: `${scope}.labeltextfield`,
    defaultMessage: 'Describe your problem',
  },

  labelselector: {
    id: `${scope}.labelselector`,
    defaultMessage: 'Type of problem',
  }
  
});
