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
import AppContainer from './AppContainer'
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import components
import LogoBar from 'components/LogoBar';

import SpeedDialMenu from 'components/SpeedDialMenu';
import { Container } from '@material-ui/core';


export default function App() {
  const theme = useTheme();
  return (
    
    <AppContainer theme={theme}>
      <SpeedDialMenu/>
      <LogoBar/>
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
