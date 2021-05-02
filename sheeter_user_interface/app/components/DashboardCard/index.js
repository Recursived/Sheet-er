/**
 *
 * DashboardCard
 *
 */

import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


const useStyles = makeStyles((theme) => ({


  boxcontainer: {
    padding: theme.spacing(2),

  },
}));
function DashboardCard() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography align="right" variant="h4" gutterBottom><FormattedMessage {...messages.titeldashboardcard} /></Typography>
      <Divider variant="fullWidth" />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >

        <Grid item>
          <Typography variant="h4" align="center">
            En cours d'élaboration
            </Typography>
        </Grid>
      </Grid>
    </React.Fragment>

  );
}

DashboardCard.propTypes = {};

export default memo(DashboardCard);
