/**
 *
 * HamburgerMenu
 *
 */

import { Grid, Hidden, IconButton } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';


// Importing icons
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import messages from './messages';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    border: `1px solid ${theme.palette.text.secondary}`,
   },
}));

function HamburgerMenu() {
  const classes = useStyles();

  return (
    <Hidden mdUp>
      <Grid item>
        <IconButton
          edge="start"
          color="primary"
          className={classes.menuButton}
        >
          <MenuIcon/>
        </IconButton>
      </Grid>
    </Hidden>
  );
}

HamburgerMenu.propTypes = {};

export default HamburgerMenu;
