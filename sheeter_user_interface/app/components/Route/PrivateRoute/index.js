/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import routes  from 'utils/routes';
import { connect } from 'react-redux';
import { compose } from 'redux';


/**
 * Private route component
 * @description This component should be used for routes where the user needs to be logged in
 */
function PrivateRoute({component: Component, ...rest}) {
  const isLogged  = rest.isLogged;
  return (
    <Route
      {...rest}
      render={(props) => 
        isLogged ? <Component {...props} /> : <Redirect to={routes.loginpage.path} />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};


const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectLoggedIn()
});


const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(PrivateRoute);
