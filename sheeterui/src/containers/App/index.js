/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Import Containers
// import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import Components below

export default function App() {
  return (
    <Fragment>
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/404" component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}
