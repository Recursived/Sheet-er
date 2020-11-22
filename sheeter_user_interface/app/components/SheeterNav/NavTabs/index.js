/**
 *
 * NavTabs
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';


import { makeSelectPathname } from 'containers/LoginPage/selectors';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeStyles, Tab, Tabs, Tooltip } from '@material-ui/core';

// Importing icons
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import messages from './messages';

const useStyle = makeStyles((theme) => ({
  tabAppBar: {
    width: '50px',
    minWidth: '50px',
    '&:hover': {
      backgroundColor : theme.palette.action.hover
    }
  }
}));

function NavTabs(props) {
  const classes = useStyle();
  // TODO: change string value with routes.js values
  const valueToRoutes = {
    0 : '/',
    1 : '/editing',
    2 : '/profile',
  };
  const routesToValue = {
    '/' : 0,
    '/editing' : 1,
    '/profile' : 2,
  };
  const { pathname, dispatch } = props;
  // console.log("pathname", pathname);

  const [tabValue, setTabValue] = React.useState(routesToValue[pathname]);

  return (
    <Tabs
      centered
      value={tabValue}
      onChange={(event, newValue) => {
        setTabValue(newValue);
        dispatch(push(valueToRoutes[newValue]));
      }}
      indicatorColor="primary"

    >
      <Tooltip title={<FormattedMessage {...messages.tabhome} />} arrow>
        <Tab className={classes.tabAppBar} icon={<HomeIcon/>} value={0}/>
      </Tooltip>
      <Tooltip title={<FormattedMessage {...messages.tabcreate} />} arrow>
        <Tab className={classes.tabAppBar} icon={<CreateIcon/>} value={1}/>
      </Tooltip>
      <Tooltip title={<FormattedMessage {...messages.tabprofile} />} arrow>
        <Tab className={classes.tabAppBar} icon={<AccountCircleIcon/>} value={2}/>
      </Tooltip>

    </Tabs>
  );
}

NavTabs.propTypes = {
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pathname: makeSelectPathname(),
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

export default compose(
  withConnect
  )(NavTabs);
