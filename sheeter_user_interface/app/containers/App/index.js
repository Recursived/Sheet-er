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


// Import container
import HomePage from 'containers/HomePage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import components
import SheeterNav from 'components/SheeterNav/Loadable';

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
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const theme = useTheme();
  const {loggedIn, path, dispatch} = props;
  
  if (!loggedIn && path == "/"){
    dispatch(push('/login'));
    dispatch(enqueueSnackbar({
      message: <FormattedMessage {...messages.hasToLogin} />,
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning'
      },
    }));
  }

  return (
    <AppContainer  theme={theme}>
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggedIn : makeSelectLoggedIn(),
  path : makeSelectPathname()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);

