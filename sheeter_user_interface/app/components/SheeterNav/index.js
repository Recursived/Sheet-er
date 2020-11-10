/**
 *
 * SheeterNav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

// Importing icons
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import SettingsIcon from '@material-ui/icons/Settings';
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

// Import material core elems
import { Divider, Grid, Hidden, Tooltip,
          AppBar, Toolbar, IconButton,
          TextField, Tabs, Tab, Button,
          MenuList, MenuItem, Paper,
          ClickAwayListener, Grow, Popper,
          ListItemIcon, Typography
        } from '@material-ui/core';
import LocaleSelector from '../LocaleSelector';      


// Importing actions and selectors
import { changeTheme } from 'containers/ThemeProvider/actions';
import { makeSelectThemeProvider } from 'containers/ThemeProvider/selectors';
import { makeSelectPathname } from 'containers/LoginPage/selectors';
import { makeSelectLoggedIn, makeSelectUserInfo } from 'containers/App/selectors';
import { push } from 'connected-react-router';

// Misc imports
import { FormattedMessage } from 'react-intl';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import AppBarLogo from 'images/logo_appbar.png';
import { isRequestLoginAction } from '../../containers/App/actions';
import { Link } from 'react-router-dom';



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
  },

  largeButton : {
    width: '200px',
  },

  buttonTextSpan: {
    marginTop: '5px'
  },
}));


function SheeterNav(props) {
  const classes = useStyles();
  const { 
    dispatch, 
    isLogged, 
    theme, 
    pathname, 
    user_info 
  } = props;

  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = React.useState(theme.palette.type == 'dark');

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


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
                spacing={2}
                alignItems="center"
              >
                {isLogged ? (
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
                ) : (
                  <></>
                )}
                <Grid item>
                  <Link
                    to={isLogged ? "/" : "/landing"}
                  >
                    <img
                      className={classes.img}
                      src={AppBarLogo}
                    />  
                  </Link>
                </Grid>
                {isLogged ? (
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
                ) : (
                  <></>
                )}
                
              </Grid>
            </Grid>
            <Grid item>
                {isLogged ? (
                  <TextField 
                    size="small" 
                    variant="filled"
                    color="primary"
                    className={classes.textField}
                    label={<FormattedMessage {...messages.researchinput} />}
                  />
                ) : (
                  <></>
                )}
            </Grid>
            <Grid item>
                {isLogged ? (
                  <IconButton
                    edge="start"
                    color="primary"
                    className={classes.menuButton}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownSharpIcon />
                  </IconButton>
                ) : (
                  <Button 
                    size="large"
                    variant="contained" 
                    color="primary"
                    endIcon={<VpnKeyIcon/>}
                    disabled={pathname == "/login" ? true : false}
                    onClick={
                      () => {
                        dispatch(push('/login'));
                      }
                    }
                  >
                    <span className={classes.buttonTextSpan}><FormattedMessage {...messages.loginbutton} /></span>
                  </Button>
                )}
              
            </Grid>
          </Grid>
        </Toolbar>                 
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper variant="outlined" square>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <AccountCircleIcon/>
                      </ListItemIcon>
                      <Typography variant="body2" gutterBottom>
                        {user_info.user.first_name +  " " + user_info.user.last_name}
                      </Typography>
                    </MenuItem>
                    <Divider variant="middle"/>
                    <MenuItem onClick={
                      () => {
                        setDark(!dark);
                        const theme = createMuiTheme({
                          palette: {
                            primary: {
                              main: '#69b488'
                            },
                            secondary: {
                              main: '#c8e6c9',
                            },
                            type: dark ? 'light' : 'dark',
                          },
                        });
                        dispatch(changeTheme(theme));
                        
                        if (anchorRef.current && anchorRef.current.contains(event.target)) {
                          return;
                        }
                    
                        setOpen(false);
                      }
                    }>
                      <ListItemIcon>
                        <Brightness6Icon/>
                      </ListItemIcon>
                      <Typography variant="inherit"><FormattedMessage {...messages.changethemebutton} /></Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        dispatch(push('/settings'));
                        if (anchorRef.current && anchorRef.current.contains(event.target)) {
                          return;
                        }
                        setOpen(false);
                      }}>
                      <ListItemIcon>
                        <SettingsIcon/>
                      </ListItemIcon>
                      <Typography variant="inherit"><FormattedMessage {...messages.settingsbutton} /></Typography>
                    </MenuItem>
                    <Divider variant="middle"/>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <ExitToAppIcon/>
                      </ListItemIcon>
                      <Typography variant="inherit"><FormattedMessage {...messages.logoutbutton} /></Typography>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </AppBar>
    </div>
    );
}

SheeterNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectLoggedIn(),
  theme: makeSelectThemeProvider(),
  pathname: makeSelectPathname(),
  user_info: makeSelectUserInfo()
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

export default compose(withConnect)(SheeterNav);
