/*
 * ProfileCard Messages
 *
 * This contains all the text for the ProfileCard component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ProfileCard';

export default defineMessages({
    messageusername: {
        id: `${scope}.messageusername`,
        defaultMessage: 'Username : ',
    },

    messagefirstname: {
        id: `${scope}.messagefirstname`,
        defaultMessage: 'First name : ',
    },

    messagelastname: {
        id: `${scope}.messagelastname`,
        defaultMessage: 'Last name : ',
    },

    messagemail: {
        id: `${scope}.messagemail`,
        defaultMessage: 'Email : ',
    },


    messagedatejoined: {
        id: `${scope}.messagedatejoined`,
        defaultMessage: 'Joining date : {date}',
    },

    titelprofilecard: {
        id: `${scope}.titelprofilecard`,
        defaultMessage: 'My account',
    },

    



});
