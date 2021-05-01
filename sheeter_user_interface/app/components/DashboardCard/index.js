/**
 *
 * DashboardCard
 *
 */

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


const useStyles = makeStyles((theme) => ({

  gridcolumn: {
    height: '100%'
  },

  paper: {
    padding: theme.spacing(2),
    height: '100%'
  },
}));
function DashboardCard() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography align="right" variant="h4" gutterBottom><FormattedMessage {...messages.titeldashboardcard} /></Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.gridcolumn}
        >
          <Grid item>
            <Typography variant="h4">
              En cours d'élaboration
            </Typography>
          </Grid>

        </Grid>

      </Paper>
    </React.Fragment>

  );
}

DashboardCard.propTypes = {};

export default memo(DashboardCard);
