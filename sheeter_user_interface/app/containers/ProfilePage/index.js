/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import selectors
import { makeSelectUserInfo } from 'containers/App/selectors';
import makeSelectProfilePage from './selectors';

// Component imports
import ProfileCard from 'components/ProfileCard/Loadable';
import DashboardCard from 'components/DashboardCard/Loadable';

// Misc imports 
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles((theme) => ({

  boxcontainer: {
    marginTop: theme.spacing(10)
  },

  gridcomp : {
    height: '40vh'
  }
}));
export function ProfilePage(props) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const classes = useStyles();
  const { dispatch, intl, userInfo } = props;
  const name = userInfo.user.first_name + " "
    + userInfo.user.last_name;


  return (
    <Container maxWidth="lg" className={classes.boxcontainer}>
      <Helmet>
        <title>{intl.formatMessage(messages.profileroute, { name: name })}</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={3}
        className={classes.gridcomp}
      >
        <Grid item xs={12} md={6}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard/>
        </Grid>
        <Grid item xs={12} md={12}>

        </Grid>
      </Grid>
    </Container>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo()
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
  withConnect,
  memo,
  injectIntl
)(ProfilePage);
