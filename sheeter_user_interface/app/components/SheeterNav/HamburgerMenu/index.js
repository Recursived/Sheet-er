/**
 *
 * HamburgerMenu
 *
 */
import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon

} from '@material-ui/core';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';


// Importing icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import messages from './messages';
import routes from 'utils/routes';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    border: `1px solid ${theme.palette.text.secondary}`,
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function HamburgerMenu(props) {
  const { dispatch } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const items = [
    {
      "text": <FormattedMessage {...messages.homepagemessage} />,
      "icon": <HomeIcon />,
      "action": () => {
        dispatch(push(routes.homepage.path));
        setOpen(false)
      },
    },
    {
      "text": <FormattedMessage {...messages.editmessage} />,
      "icon": <CreateIcon />,
      "action": () => {
        dispatch(push(routes.editingpage.path));
        setOpen(false);
      },
    },
    {
      "text": <FormattedMessage {...messages.profilemessage} />,
      "icon": <AccountCircleIcon />,
      "action": () => {
        dispatch(push(routes.profilepage.path));
        setOpen(false);
      },
    }
  ]

  return (
    <Hidden mdUp>
      <Grid item>
        <IconButton
          edge="start"
          color="primary"
          onClick={() => setOpen(true)}
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {items.map((elem, index) => (
            <ListItem button onClick={elem.action} key={index}>
              <ListItemIcon>{elem.icon}</ListItemIcon>
              <ListItemText primary={elem.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Hidden>
  );
}

HamburgerMenu.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(HamburgerMenu);

