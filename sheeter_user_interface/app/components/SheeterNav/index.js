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

// Importing components
import NavSearchBar from './NavSearchBar/Loadable';
import NavTabs from './NavTabs/Loadable';
import NavButtonLogin from './NavButtonLogin/Loadable';
import HamburgerMenu from './HamburgerMenu/Loadable';


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
import { isRequestLoginAction, isRequestLogOutAction } from '../../containers/App/actions';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  img: {
    height: "45px",
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

  
}));


function SheeterNav(props) {
  const classes = useStyles();
  const { 
    dispatch, 
    isLogged, 
    theme, 
    user_info 
  } = props;


  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = React.useState(theme.themeColor == 'dark');


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
      if (anchorRef.current != null) { anchorRef.current.focus();}
      
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <div>
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
                  <HamburgerMenu/>
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
                      <NavTabs/>
                    </Grid>
                  </Hidden>
                ) : (
                  <></>
                )}
                
              </Grid>
            </Grid>
            <Grid item>
                <NavSearchBar/>
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
                  <NavButtonLogin/>
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
                    <MenuItem onClick={() => {
                        dispatch(push('/profile'));
                        if (anchorRef.current && anchorRef.current.contains(event.target)) {
                          return;
                        }
                        setOpen(false);
                      }}>
                      <ListItemIcon>
                        <AccountCircleIcon/>
                      </ListItemIcon>
                      <Typography variant="inherit">
                        {user_info != null ? 
                          user_info.user.first_name +  " " + user_info.user.last_name :
                          "Mon profil"
                        }
                      </Typography>
                    </MenuItem>
                    <Divider variant="middle"/>
                    <MenuItem onClick={
                      () => {
                        setDark(!dark);
                        dispatch(changeTheme(dark ? 'light' : 'dark'));
                        
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
                    <MenuItem onClick={() => {
                        if (anchorRef.current && anchorRef.current.contains(event.target)) {
                          return;
                        }
                        setOpen(false);
                        dispatch(isRequestLogOutAction());
                      }}>
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
