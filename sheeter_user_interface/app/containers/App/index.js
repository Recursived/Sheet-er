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
import { Switch, Route, Redirect } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import routes from 'utils/routes';


// Import container
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import EditingPage from 'containers/EditingPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import SheetPage from 'containers/SheetPage/Loadable';
import MobileSheetPage from 'containers/MobileSheetPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';

// Import components
import SheeterNav from 'components/SheeterNav/Loadable';
import PrivateRoute from 'components/Route/PrivateRoute';
import PublicRoute from 'components/Route/PublicRoute';

// Misc imports
import saga from './saga';
import AppContainer from './AppContainer';


export function App(props) {
  useInjectSaga({ key: 'global', saga });
  const theme = useTheme();

  return (
    <AppContainer theme={theme}>
      <SheeterNav />
      <Switch>
        <PrivateRoute
          exact
          path={routes.homepage.path}
          component={HomePage}
        />
        <PrivateRoute
          exact
          path={routes.editingpage.path}
          component={EditingPage}
        />
        <PrivateRoute
          exact
          path={routes.settingspage.path}
          component={SettingsPage}
        />
        <PrivateRoute
          exact
          path={routes.sheetpage.path}
          component={SheetPage}
        />
        <PrivateRoute
          exact
          path={routes.profilepage.path}
          component={ProfilePage}
        />
        <PublicRoute
          exact
          path={routes.landingpage.path}
          component={LandingPage}
        />
        <PublicRoute
          exact
          path={routes.mobilesheetpage.path}
          component={MobileSheetPage}
        />
        <PublicRoute
          restricted
          path={routes.loginpage.path}
          component={LoginPage}
        />
        <PublicRoute
          exact
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
  mapDispatchToProps,
);

export default compose(withConnect)(App);

