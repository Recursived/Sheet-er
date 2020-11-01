/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

// Import components
import LoginPageForm from 'components/LoginPageForm';
import LocaleSelector from 'components/LocaleSelector';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container : {
    marginTop: '30vh'
  }
}));
export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.container} >
      <Helmet>
        <title>Log into Sheeter</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Grid 
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <LoginPageForm/>
        </Grid>
        <Grid item>
          <LocaleSelector></LocaleSelector>
        </Grid>
      </Grid>
      
    </Container>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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
)(LoginPage);
