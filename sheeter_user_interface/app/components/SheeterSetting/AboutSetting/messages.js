/*
 * BottomBar Messages
 *
 * This contains all the text for the BottomBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ThemeSetting';

export default defineMessages({
  titlehelpeditorsection: {
    id: `${scope}.titlehelpeditorsection`,
    defaultMessage: 'How to use the editor',
  },

  bodyhelpeditor: {
    id: `${scope}.bodyhelpeditor`,
    defaultMessage: `There are two main parts in the editor. 
    The first part is the editor itself in which you can write anything. 
    You can even style by highlighting a word/sentence. You'll be given 
    an inline menu with multiple styling choices. If you want to add 
    more specified elements, you can go toward the tab menu on the left which is 
    organised by topic. On the science section, you can add LaTeX to your sheet. 
    There is specific ascii syntax that you can find on the link on the 'syntax'
    section : 
    `,
  },

});
