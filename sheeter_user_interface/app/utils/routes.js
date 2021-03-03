/**
 * Routes.js : This file should contain every routes accessible within this app
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

// Importing route messages
import homepageMessages from 'containers/HomePage/messages';
import landingpageMessages from 'containers/LandingPage/messages';
import notfoundpageMessages from 'containers/NotFoundPage/messages';
import loginpageMessages from 'containers/LoginPage/messages';
import editingpageMessages from 'containers/EditingPage/messages';



export default {
    homepage: {
        path: '/',
        name:  <FormattedMessage {...homepageMessages.routeHomepage} />,
    },

    landingpage: {
        path: '/landing',
        name: <FormattedMessage {...landingpageMessages.routeLandingpage} />,
    },
    
    notfoundpage: {
        path: '*',
        name: <FormattedMessage {...notfoundpageMessages.routeNotfoundpage} />,
    },

    loginpage: {
        path: '/login',
        name: <FormattedMessage {...loginpageMessages.routeLoginpage} />,
    },

    editingpage: {
        path: '/editing',
        name: <FormattedMessage {...editingpageMessages.routeLoginpage} />,
    }
}