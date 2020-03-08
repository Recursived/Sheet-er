/**
 *
 * LandingPage
 *
 */

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Import components
import LandingPageForm from 'components/LandingPageForm';

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



const useStyles  = makeStyles({
  container :{
    margin : 0,
  },
  
});

export function LandingPage() {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const classes = useStyles();
  return (
    <div>
      <FormattedMessage id="app.containers.LandingPage.title">
        {title => {
          return (
          <Helmet>
            <title>{title}</title>
          </Helmet>
          )
        }}
      </FormattedMessage>
      <Container className={classes.container} maxWidth="xl">
          <LandingPageForm></LandingPageForm>
      </Container>
      
    </div>
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
