/**
 *
 * PublicRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import routes from 'utils/routes';
import { connect } from 'react-redux';
import { compose } from 'redux';

const stateSelector = createStructuredSelector({
  isLogged: makeSelectLoggedIn()
});

/**
 * PublicRoute
 * @description route that redirects the user to the homepage if
 * user is connected and route is restricted
 */
function PublicRoute({
  component : Component,
  restricted,
  ...rest
}) {
  const isLogged = rest.isLogged;
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged && restricted ? (
          <Redirect to={routes.homepage.path}/>
        ) : (
          <Component {...props}/>
        )     
      }
    
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  restricted: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectLoggedIn()
});


const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(PublicRoute);
