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

  labeltextfield: {
    id: `${scope}.labeltextfield`,
    defaultMessage: 'Describe your problem ({char}/1000)',
  },

  labelselector: {
    id: `${scope}.labelselector`,
    defaultMessage: 'Category',
  }
  
});
