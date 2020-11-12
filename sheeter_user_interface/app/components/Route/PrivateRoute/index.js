/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoggedIn } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isLogged: makeSelectLoggedIn()
});

function PrivateRoute({component: Component, ...rest}) {
  const { isLogged } = useSelector(stateSelector);
  return (
    <Route
      {...rest}
      render={(props) => 
        isLogged ? <Component {...props} /> : <Redirect to="/login"/>
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
