/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import { Box, Container, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
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

// Component imports
import ProfileCard from 'components/ProfileCard/Loadable';
import DashboardCard from 'components/DashboardCard/Loadable';
import FilterSheetType from 'components/FilterSheetType/Loadable';
import PersonalSheetDisplay from 'components/PersonalSheetDisplay';

// Misc imports 
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { requestGetMySheets } from 'containers/ProfilePage/actions';

const useStyles = makeStyles((theme) => ({

  boxcontainer: {
    paddingTop: theme.spacing(10)
  },

  paper: {
    padding: theme.spacing(3),
    height: '100%',
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[200],
  }
}));
export function ProfilePage(props) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const classes = useStyles();
  const { dispatch, intl, userInfo } = props;
  const name = userInfo.user.first_name + " "
    + userInfo.user.last_name;

  React.useEffect(() => {
    dispatch(requestGetMySheets());
  }, [])
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
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <ProfileCard />
          </Paper>

        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <DashboardCard />
          </Paper>

        </Grid>
        <Grid item xs={12} md={12}>
          <Typography gutterBottom variant="h4" align="center"><FormattedMessage {...messages.titlemysheetsection}/></Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <FilterSheetType />
        </Grid>
        <Grid item xs={12} md={12}>
          <PersonalSheetDisplay/>
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
