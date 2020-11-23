/**
 *
 * NavDropMenu
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

// Import material core elems
import { 
  MenuList, MenuItem, Paper, IconButton,
  ClickAwayListener, Grow, Popper,
  ListItemIcon, Typography, Divider, makeStyles    
} from '@material-ui/core';

// Importing icons
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Importing actions and selectors
import { changeTheme } from 'containers/ThemeProvider/actions';
import { makeSelectThemeProvider } from 'containers/ThemeProvider/selectors';
import { makeSelectUserInfo } from 'containers/App/selectors';
// Misc imports
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';



const useStyle = makeStyles((theme) => ({
  menuButton: {
    border: `1px solid ${theme.palette.text.secondary}`,
   },
}));

function NavDropMenu(props) {
  const { 
    dispatch, 
    theme, 
    user_info 
  } = props;
  const classes = useStyle();
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
    <Fragment>
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
    </Fragment> 
  );
}

NavDropMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  theme: makeSelectThemeProvider(),
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


export default compose(withConnect)(NavDropMenu);
