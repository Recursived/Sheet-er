/**
 *
 * HomePage
 *
 */

// import components
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import makeSelectHomePage from './selectors';
import { Container, Grid, makeStyles } from '@material-ui/core';

// Components import
import MainSearchbar from 'components/MainSearchbar/Loadable';
import MainSheetDisplay from 'components/MainSheetDisplay/Loadable';

// Misc imports
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';


const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: '15vh'
  }


}));


export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const { dispatch, intl } = props;
  const classes = useStyle();


  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.routeHomepage)}</title>
      </Helmet>
      <Container maxWidth="lg" className={classes.container}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={5}
        >
          <Grid xs={12} item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={5}
            >
              <Grid xs={2} item></Grid>
              <Grid xs={8} item><MainSearchbar /></Grid>
              <Grid xs={2} item></Grid>
              
            </Grid>
            
          </Grid>
          <Grid xs={12} item>
            <MainSheetDisplay />
          </Grid>

        </Grid>

      </Container>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
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
)(HomePage);
