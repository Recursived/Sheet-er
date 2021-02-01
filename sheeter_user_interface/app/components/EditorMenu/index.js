/**
 *
 * EditorMenu
 *
 */

import {
  makeStyles,
  Grid,
  Box,
  Divider,
  TextField,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';


// Importing icons
import SaveIcon from '@material-ui/icons/Save';


// Misc imports
import messages from './messages';
import LocaleCombo from './LocaleCombo';
import SheetTypeCombo from './SheetTypeCombo';

const useStyles = makeStyles(theme => ({

  containermenu: {
    minHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),

    }
  },




}));

function EditorMenu(props) {
  const classes = useStyles();


  return (
    <Box className={classes.containermenu}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label={<FormattedMessage {...messages.titlesheet} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocaleCombo />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SheetTypeCombo />
            </Grid>
            <Grid item xs={10} sm={10}>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Tooltip title={<FormattedMessage {...messages.tooltipsave} />}>
                <IconButton color="primary">
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          efmlzjfze
        </Grid>
        <Divider />
        <Grid item>
          ochcazohoaz
        </Grid>
      </Grid>
    </Box>
  );
}

EditorMenu.propTypes = {};

const mapStateToProps = createStructuredSelector({
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

export default compose(
  withConnect,
  memo
)(EditorMenu);
