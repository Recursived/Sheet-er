/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const frLocaleData = require('react-intl/locale-data/fr');

const enTranslationMessages = require('./translations/en.json');
const frTranslationMessages = require('./translations/fr.json');

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

// Function used to guessed the language used on the client computer
const getFirstBrowserLanguage = function () {
  var nav = window.navigator,
  browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
  i,
  language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        var contains_dash = language.indexOf("-");
        return  contains_dash != -1 ? language.substring(0, contains_dash) : language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      var contains_dash = language.indexOf("-");
        return  contains_dash != -1 ? language.substring(0, contains_dash) : language;
    }
  }

  return null;
};


const GUESSED_LOCALE = getFirstBrowserLanguage();
// If couldn't guess any locale, set default english locale
const DEFAULT_LOCALE =  GUESSED_LOCALE == null ? 'en' : GUESSED_LOCALE;

// prettier-ignore
const appLocales = [
  'en',
  'fr',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
