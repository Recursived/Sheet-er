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
  containercarousel: {
    margin: 0,
    padding: 0,
    width: "100vw"
  },

  container : {
    paddingTop: '80px',

  },

  containerBottomBar : {
    marginTop: 100,
    height: 80,
    textAlign: 'center',
    padding : theme.spacing(2),
  },

  itemAppli : {
    padding : theme.spacing(2),
    height : 500
  },

  image : {
    width: '100%',
    height: 'auto',
  }
}));

export function LandingPage() {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const classes = useStyles();
  return (
    <CarouselLanding></CarouselLanding>
    
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
