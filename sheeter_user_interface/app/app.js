/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';
import { omit, throttle } from 'lodash';

import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import main providers
import LanguageProvider from 'providers/LanguageProvider';
import ThemeProvider from 'providers/ThemeProvider';
import NotifProvider from 'providers/NotifProvider';
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import { loadState, saveState } from './utils/storePersister';


// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = loadState();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');


// Load and Save redux store to localStorage
store.subscribe(
  throttle(() => {
    saveState({
      language: store.getState().language,
      global: omit(store.getState().global, [
        'contactDialog',
        'contactMessage'
      ]),
      theme: store.getState().theme
    });
  }, 1000),
);

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider messages={messages} preventDuplicate>
          <SnackbarProvider maxSnack={3}>
            <ConnectedRouter history={history}>
              <NotifProvider />
              <App />
            </ConnectedRouter>
          </SnackbarProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
