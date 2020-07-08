/**
 *
 * LandingPage
 *
 */

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Import components
import LandingPageForm from 'components/LandingPageForm';
import lpimage from './LandingPage_sheeter.png'

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectLandingPage from './selectors';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 0,
    paddingTop: 'calc(5%)',
  },


  lpimagestyle: {
    maxWidth: '95%',
    borderRadius: '2px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}));

export function LandingPage() {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const classes = useStyles();
  return (
    <>
      <FormattedMessage id="app.containers.LandingPage.title">
        {title => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Container className={classes.container} maxWidth="xl">
        <Grid container >
          <Grid item sm={12} md={8} >
            <img 
              className={classes.lpimagestyle}
              src={lpimage} 
              alt="Landing page">
            </img>
          </Grid>
          <Grid container
           item 
           sm={12} 
           md={4}
           direction="column"
           justify="center"
           alignItems="center"
          >
            <LandingPageForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default compose(withConnect)(LandingPage);
