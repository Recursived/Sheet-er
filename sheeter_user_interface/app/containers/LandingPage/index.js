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
import { Grid, Button, TextField, Container, Paper } from '@material-ui/core';

const useStyles  = makeStyles({
  container :{
    margin : 0,
  },
  paper : {
    width:"100%"
  }
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
        <Grid container>
          <Paper elevation={20} className={classes.paper}>
            <Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  id=""
                  label={<FormattedMessage {...messages.email}/>}
                  type="text"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id=""
                  label={<FormattedMessage {...messages.name}/>}
                  type="text"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Grid item sm={10}>
              <TextField
                id=""
                label={<FormattedMessage {...messages.firstname}/>}
                type="text"
                autoComplete="current-password"
                fullWidth
              />
            </Grid>
          </Paper>
          
          
          </Grid>
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
