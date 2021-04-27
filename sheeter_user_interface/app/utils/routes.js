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
import settingspageMessages from 'containers/SettingsPage/messages';
import sheetpageMessages from 'containers/SheetPage/messages'
import mobilesheetpageMessages from 'containers/MobileSheetPage/messages'
import profilepageMessages from 'containers/ProfilePage/messages';


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
        name: <FormattedMessage {...editingpageMessages.editingroute} />,
    },
      
    settingspage: {
        path: '/settings',
        name: <FormattedMessage {...settingspageMessages.routeSettingsPage} />,
    },
      
    sheetpage: {
        path: '/sheet/:id',
        name:  <FormattedMessage {...sheetpageMessages.sheetroute} />,
    },

    mobilesheetpage: {
        path: '/mobile/sheet',
        name: <FormattedMessage {...mobilesheetpageMessages.mobilesheetroute} />,
    },

    profilepage: {
        path: '/profile',
        name: <FormattedMessage {...profilepageMessages.profileroute} />
    }
}