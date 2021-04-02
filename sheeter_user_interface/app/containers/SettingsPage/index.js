/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import ExitToApp from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';

import { isRequestLogOutAction } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ThemeSetting from '../../components/SheeterSetting/ThemeSetting';
import AboutSetting from '../../components/SheeterSetting/AboutSetting';
import AccountSetting from '../../components/SheeterSetting/AccountSetting';
import LanguageSetting from '../../components/SheeterSetting/LanguageSetting';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer - 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  root: {
    marginTop: '8%',
    marginLeft: '20%',
    marginRight: '3%',
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
}));

export function SettingsPage(props) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  const classes = useStyles();

  const {
    dispatch,
    theme,
    user_info
  } = props

  const [currentTab, setCurrentTab] = React.useState("None");


  let settingComponent = null;
  switch (currentTab) {
    case "AccountSetting":
      settingComponent = <AccountSetting />;
      break;
    case "LanguageSetting":
      settingComponent = <LanguageSetting />;
      break;
    case "ThemeSetting":
      settingComponent = <LanguageSetting />;
      break;
    case "AboutSetting":
      settingComponent = <AboutSetting />;
      break;
    default:
      settingComponent = <span />;
  }

  console.log(currentTab);

  // {(state.currentTab == "ThemeSetting") && <ThemeSetting />}
  // {(state.currentTab == "AboutSetting") && <AboutSetting />}
  // {(state.currentTab == "AccountSetting") && <AccountSetting />}
  // {(state.currentTab == "LanguageSetting") && <LanguageSetting />

  return (
    <div>
      <Helmet>
        <title>SettingsPage</title>
        <meta name="description" content="Description of SettingsPage" />
      </Helmet>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="Account" onClick={() => { setCurrentTab("AccountSetting") }}>
              <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
            <Divider />
            <ListItem button key="Language" onClick={() => { setCurrentTab("LanguageSetting") }}>
              <ListItemIcon> <LanguageIcon /> </ListItemIcon>
              <ListItemText primary="Language" />
            </ListItem>
            <ListItem button key="Theme" onClick={() => { setCurrentTab("ThemeSetting") }}>
              <ListItemIcon> <Brightness6Icon /> </ListItemIcon>
              <ListItemText primary="Theme" />
            </ListItem>
            <Divider />
            <ListItem button key="Log out" onClick={() => { dispatch(isRequestLogOutAction()); }}>
              <ListItemIcon> <ExitToApp /> </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
            <ListItem button key="About" onClick={() => { setCurrentTab("AboutSetting") }}>
              <ListItemIcon> <InfoIcon /> </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <div>
        <Card className={classes.root} id="tab-viewer">
          {settingComponent}
        </Card>
      </div>

    </div>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
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

export default compose(withConnect)(SettingsPage);
