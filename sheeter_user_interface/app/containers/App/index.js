/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import  routes  from 'utils/routes';


// Import container
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import components
import SheeterNav from 'components/SheeterNav/Loadable';
import PrivateRoute from 'components/Route/PrivateRoute';
import PublicRoute from 'components/Route/PublicRoute';

// Misc imports
import {
  enqueueSnackbar,
  closeSnackbar,
} from 'containers/NotifProvider/actions';
import AppContainer from './AppContainer';
import { makeSelectLoggedIn, makeSelectPathname} from './selectors'
import reducer from './reducer';
import messages from './messages';
import saga from './saga';


export function App(props) {
  useInjectSaga({ key: 'global', saga });
  const theme = useTheme();
  // const {loggedIn, path, dispatch} = props;
  
  return (
    <AppContainer  theme={theme}>
      <SheeterNav/>
        <Switch>
          <PrivateRoute
            exact 
            path={routes.homepage.path} 
            component={HomePage} 
          />
          <PublicRoute 
            exact 
            path={routes.landingpage.path}
            component={LandingPage} 
          />
          <PublicRoute
            restricted
            path={routes.loginpage.path}
            component={LoginPage}
          />
          <PublicRoute
            path={routes.notfoundpage.path}
            component={NotFoundPage}
          />
        </Switch>
    </AppContainer>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   loggedIn : makeSelectLoggedIn(),
//   path : makeSelectPathname()
// });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(App);

