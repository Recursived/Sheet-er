/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { CHANGE_LOCALE } from './constants';
// import { DEFAULT_LOCALE } from '../../i18n';

const getFirstBrowserLanguage = function() {
  const nav = window.navigator;
  const browserLanguagePropertyKeys = [
    'language',
    'browserLanguage',
    'systemLanguage',
    'userLanguage',
  ];
  let i;
  let language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        var contains_dash = language.indexOf('-');
        return contains_dash != -1
          ? language.substring(0, contains_dash)
          : language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      var contains_dash = language.indexOf('-');
      return contains_dash != -1
        ? language.substring(0, contains_dash)
        : language;
    }
  }

  return null;
};

const guessedLocale = getFirstBrowserLanguage();

export const initialState = {
  locale: guessedLocale === null ? 'en' : guessedLocale,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
