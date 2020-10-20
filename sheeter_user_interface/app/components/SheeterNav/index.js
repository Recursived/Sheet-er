/**
 *
 * SheeterNav
 *
 */

import React, { memo } from 'react';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Hidden } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { fade, makeStyles } from '@material-ui/core/styles';
import messages from './messages';
import AppBarLogo from './logo_appbar.png';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  img: {
    height: "45px",
  },

  menuButton: {
    backgroundColor: theme.palette.primary[200],
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
  },

  inputLabel: {
    color: theme.palette.primary.dark
  },

  input: {
    color: theme.palette.primary.dark,
    '&:before': {
      borderBottom: `1px solid ${theme.palette.grey[700]}`
    },
    '&:hover:before': {
      borderBottom: `1px solid ${theme.palette.primary[400]}`
    },
  },

  textField: {
    backgroundColor:  theme.palette.primary[200],
  }
}));


function SheeterNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Hidden smUp>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <img
                className={classes.img}
                src={AppBarLogo}
                />
            </Grid>
            <Grid item>
              <Hidden smDown>
                <Tabs
                  indicatorColor="secondary"
                  textColor="inherit"
                  centered
                >
                  <Tab label="Item One" />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                </Tabs>
              </Hidden>
            </Grid>
            <Grid item>
              <Grid
                  container
                  spacing="2"
                  alignItems="center"
              >
                <Grid item>
                  <SearchIcon color="primary" />
                </Grid>
                <Grid item>
                  <TextField 
                    size="small" 
                    variant="filled"
                    className={classes.textField}
                    InputLabelProps={{
                      className: classes.inputLabel
                    }}
                    InputProps={{
                      className: classes.input
                    }}
                    label={<FormattedMessage {...messages.researchinput} />}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    edge="start"
                    color="primary"
                    className={classes.menuButton}
                  >
                    <ArrowDropDownSharpIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
          
          
        </Toolbar>
      </AppBar>
    </div>
    );
}

SheeterNav.propTypes = {};

export default memo(SheeterNav);
