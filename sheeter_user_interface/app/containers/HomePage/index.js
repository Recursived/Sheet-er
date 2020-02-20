/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import components 
import LocaleSelector from 'components/LocaleSelector';
import ThemeToggler from 'components/ThemeToggler';

export default function HomePage() {

  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <FormattedMessage {...messages.main} />
      <LocaleSelector></LocaleSelector>
      <ThemeToggler></ThemeToggler>
    </h1>
    
  );
}
