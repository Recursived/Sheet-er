/**
 *
 * NotifProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectNotifProvider } from './selectors';
import { SnackbarProvider } from 'notistack';

/**
 * This containers enables notification functionnality 
 * See how to use notifications with https://iamhosseindhv.com/notistack/demos#variants
 */
export function NotifProvider(props) {
  console.log(props);
  return (
    <SnackbarProvider maxSnack={3}>
      {React.Children.only(props.children)}
    </SnackbarProvider>
  );
}

NotifProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectNotifProvider(),
  notifications => notifications
);


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifProvider);