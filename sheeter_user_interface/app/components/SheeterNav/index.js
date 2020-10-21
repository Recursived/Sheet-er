/**
 *
 * SheeterNav
 *
 */

import React, { memo } from 'react';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

import { Divider, Grid, Hidden, Tooltip } from '@material-ui/core';
// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import messages from './messages';
import AppBarLogo from './logo_appbar.png';



const useStyles = makeStyles((theme) => ({
  img: {
    height: "45px",
  },

  menuButton: {
   border: `1px solid ${theme.palette.text.secondary}`,
  
  },

  textField: {
    width: '35vw',
    [theme.breakpoints.up('md')]: {
      marginLeft: '-120px'
    }
  },

  tabAppBar: {
    width: '50px',
    minWidth: '50px',
    '&:hover': {
      backgroundColor : theme.palette.action.hover
    }
  }
}));


function SheeterNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                spacing="2"
                alignItems="center"
              >
                <Hidden mdUp>
                  <Grid item>
                    <IconButton
                      edge="start"
                      color="primary"
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                </Hidden>
                <Grid item>
                  <img
                    className={classes.img}
                    src={AppBarLogo}
                  />  
                </Grid>
                <Hidden smDown>
                  <Grid item>
                    <Tabs
                      centered
                    >
                      <Divider flexItem  orientation="vertical"/>
                      <Tooltip title={<FormattedMessage {...messages.tabhome} />} arrow>
                        <Tab className={classes.tabAppBar} icon={<HomeIcon/>}/>
                      </Tooltip>
                      <Divider flexItem  orientation="vertical"/>
                      <Tooltip title={<FormattedMessage {...messages.tabcreate} />} arrow>
                        <Tab className={classes.tabAppBar} icon={<CreateIcon/>}/>
                      </Tooltip>
                      <Divider flexItem  orientation="vertical"/>
                      <Tooltip title={<FormattedMessage {...messages.tabprofile} />} arrow>
                        <Tab className={classes.tabAppBar} icon={<AccountCircleIcon/>}  />
                      </Tooltip>
                      <Divider flexItem  orientation="vertical"/>
                    </Tabs>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item>
              <TextField 
                size="small" 
                variant="filled"
                color="primary"
                className={classes.textField}
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
        </Toolbar>
      </AppBar>
    </div>
    );
}

SheeterNav.propTypes = {};

export default memo(SheeterNav);
