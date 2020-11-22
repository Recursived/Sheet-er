/**
 *
 * NavSearchBar
 *
 */

import { TextField } from '@material-ui/core';
import React, { memo } from 'react';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Misc import
import messages from './messages';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '35vw',
    [theme.breakpoints.up('md')]: {
      marginLeft: '-120px'
    }
  },
}));

function NavSearchBar(props) {
  const classes = useStyles();
  const isLogged = props.isLogged;

  // When not logged, we shouldn't see the searchbar
  if (isLogged){
    return (
        <TextField
          size="small"
          variant="filled"
          color="primary"
          className={classes.textField}
          label={<FormattedMessage {...messages.researchinput} />} 
        />
    );
  } else {
    return (<></>);
  }

}

NavSearchBar.propTypes = {
  isLogged: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectLoggedIn()
});

const withConnect = connect(
  mapStateToProps,
  memo
);

export default compose(withConnect)(NavSearchBar);
