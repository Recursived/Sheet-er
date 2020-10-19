/**
 *
 * SheeterNav
 *
 */

import React, { memo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import messages from './messages';

const useStyles = makeStyles((theme) => ({
  searchfield: {
    maxWidth: '150px'
  },
}));


function SheeterNav() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <TextField size="small" label={ <FormattedMessage {...messages.researchinput}/>} variant="outlined" />
      
    </AppBar>
  );
}

SheeterNav.propTypes = {};

export default memo(SheeterNav);
