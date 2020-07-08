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

// Import container
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';


import SpeedDialMenu from 'components/SpeedDialMenu';
import { Container } from '@material-ui/core';
import AppContainer from './AppContainer';

export default function App() {
  const theme = useTheme();
  return (
    <AppContainer theme={theme}>
      <SpeedDialMenu />
      <Container height="100%" maxWidth="xl">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LandingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </AppContainer>
  );
}
