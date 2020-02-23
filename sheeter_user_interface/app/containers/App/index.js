/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import AppContainer from './AppContainer'
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';


export default function App() {
  const theme = useTheme();
  return (
    
    <AppContainer theme={theme}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppContainer>
  );
}
