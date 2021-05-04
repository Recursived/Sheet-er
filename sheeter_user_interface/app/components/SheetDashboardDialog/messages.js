/*
 * SheetDashboardDialog Messages
 *
 * This contains all the text for the SheetDashboardDialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SheetDashboardDialog';

export default defineMessages({
  titledialog: {
    id: `${scope}.titledialog`,
    defaultMessage: 'Sheet dashboard : {title}',
  },

  labelbutton:{
    id: `${scope}.labelbutton`,
    defaultMessage: 'Edit',
  },

  tooltipeditbutton: {
    id: `${scope}.tooltipeditbutton`,
    defaultMessage: 'Modify this sheet on the editor',
  },

  nbclickitem: {
    id: `${scope}.nbclickitem`,
    defaultMessage: 'Views',
  },

  upvoteitem: {
    id: `${scope}.upvoteitem`,
    defaultMessage: 'Upvotes',
  },

  downvoteitem: {
    id: `${scope}.downvoteitem`,
    defaultMessage: 'Downvote',
  },
});
