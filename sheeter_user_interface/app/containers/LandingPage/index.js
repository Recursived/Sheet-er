/**
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import makeSelectLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {Container,Grid} from '@material-ui/core';
import LandingPageForm from 'components/LandingPageForm';

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
