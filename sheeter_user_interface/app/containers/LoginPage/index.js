/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

// Import components
import LoginPageForm from 'components/LoginPageForm';
import LocaleSelector from 'components/LocaleSelector';
import BottomBar from 'components/BottomBar/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Container, Grid } from '@material-ui/core';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import { push } from 'connected-react-router';

const useStyles = makeStyles(theme => ({

}));
export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const intl = props.intl;
  const classes = useStyles();
  
  return (
    <div>
      
        <Helmet>
          <title>{intl.formatMessage(messages.header)}</title>
        </Helmet>
        <Grid 
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          style={{ minHeight: '100vh' }}
        >
          <Grid item/>
          <Container maxWidth="xs" >
            <Grid 
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item>
                <LoginPageForm/>
              </Grid>
              <Grid item>
                <LocaleSelector/>
              </Grid>
            </Grid>
          </Container>
          <Grid item>
            <BottomBar/>
          </Grid>
        </Grid>
        
      
    </div>
  );
}

LoginPage.propTypes = {
  
};


export default compose(
  memo,
  injectIntl
)(LoginPage);
