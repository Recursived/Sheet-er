/**
 *
 * NotifProvider
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { createSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'utils/injectReducer';
import { removeSnackbar } from './actions';

import { makeSelectNotifProvider } from './selectors';
import reducer from './reducer';

let displayed = [];

/**
 * This containers enables notification functionnality
 * See how to use notifications with https://iamhosseindhv.com/notistack/demos#variants
 */
export function NotifProvider(props) {
  useInjectReducer({ key: 'notifProvider', reducer });

  const { dispatch, notifications } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = id => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = id => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // removen this snackbar from redux store
            dispatch(removeSnackbar(myKey));
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      },
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
  return null;
}

NotifProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectNotifProvider(),
  notifications => ({ notifications }),
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotifProvider);
