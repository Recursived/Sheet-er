/**
 *
 * BottomBar
 *
 */

import React, { memo } from 'react';
import { 
  Grid,
  makeStyles,
  Paper 
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import  routes  from 'utils/routes';


const useStyles = makeStyles(theme => ({

  paper: {
    position: 'asbolute',
    bottom: 0
  },
  
  container: {
    height: '60px',
  },

  leftItem: {
    paddingLeft : "10px"
  },

  rightItem: {
    paddingRight: "10px"
  },
}));

function BottomBar() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
        <Grid 
          container
          className={classes.container}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid className={classes.leftItem} item>
            <FormattedMessage {...messages.sheeterinc} />
          </Grid>
          <Grid item>
            <Link to={routes.contactus.path}>
              <FormattedMessage {...messages.contactus} />
            </Link>
          </Grid>
          <Grid className={classes.rightItem} item>
            <FontAwesomeIcon icon={faCoffee} />
          </Grid>
          
        </Grid>
    </Paper>
  );
}

BottomBar.propTypes = {};

export default memo(BottomBar);
