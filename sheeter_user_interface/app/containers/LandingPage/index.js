/**
 *
 * LandingPage
 *
 */

import { Container, Grid, Hidden, Paper, Divider, Typography } from '@material-ui/core';
import { LoremIpsum, Avatar } from "react-lorem-ipsum";
import { makeStyles } from '@material-ui/core/styles';

// Import components
import CarouselLanding from 'components/CarouselLanding';
import BottomBar from 'components/BottomBar/Loadable';

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectLandingPage from './selectors';
import messages from './messages';



const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5vh"
  },

  jumbotron: {
    textAlign: 'center',
    
    boxShadow: `${theme.shadows[10]}`
  }
}));

export function LandingPage(props) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const classes = useStyles();
  const { dispatch, intl} = props;
  return (
    <React.Fragment>
      <Helmet>
        <title>{intl.formatMessage(messages.routeLandingpage)}</title>
      </Helmet>
      <Hidden xsDown>
        <CarouselLanding></CarouselLanding>
        <Container className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xl={12}>
              <Paper className={classes.jumbotron}>
                <Typography variant="h2">
                  <FormattedMessage {...messages.jumbotron} />
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              TEST 1 2
            </Grid>
          </Grid>
        </Container>
      </Hidden>
      <Hidden smUp>
        <p>Ici on met une image qui demande aux users de dl l'appli mobile sheeter</p>
      </Hidden>
    </React.Fragment>

  );
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
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
  injectIntl
)(LandingPage);
