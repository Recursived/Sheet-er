/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';


// Import container
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import components
import SheeterNav from 'components/SheeterNav/Loadable';

// Misc imports
import AppContainer from './AppContainer';
import reducer from './reducer';
import saga from './saga';

export default function App() {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const theme = useTheme();
  return (
    <AppContainer theme={theme}>
      <SheeterNav/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
    </AppContainer>
  );
}
