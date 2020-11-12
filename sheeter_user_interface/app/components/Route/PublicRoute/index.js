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

const stateSelector = createStructuredSelector({
  isLogged: makeSelectLoggedIn()
});

function PublicRoute({
  component : Component,
  restricted,
  ...rest
}) {
  const { isLogged } = useSelector(stateSelector);
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged && restricted ? (
          <Redirect to="/"/>
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

export default PublicRoute;
