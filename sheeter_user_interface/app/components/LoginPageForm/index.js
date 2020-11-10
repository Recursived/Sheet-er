/**
 *
 * LandingPageForm
 *
 */

import {
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Fade,
  Tooltip,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleLogin  from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FormattedMessage } from 'react-intl';
import React from 'react';

// Misc import
import { RETRIEVE_USERAPI } from 'utils/api';
import getAPI from 'utils/api';
import AppBarLogo from 'images/logo_appbar.png';
import messages from './messages';
import { isRequestLoginAction } from 'containers/App/actions';
import {
  enqueueSnackbar,
  closeSnackbar,
} from 'containers/NotifProvider/actions';


const useStyles = makeStyles(theme => ({
  img: {
    height: '80px',
  },

  googleButton: {
    width: '250px',
    alignItems: 'center',
    justifyContent: 'center',
    '& div': {
      padding: 'unset!important',
    }
  },

  facebookButton: {
    width: '250px'
  },

  fbIcon: {
    marginRight: '7px'
  }

}));



function LoginPageForm(props) {
  const classes = useStyles();
  const { dispatch } = props;
  const [ isLoading, setIsLoading ] = React.useState(false);
  

  const responseGoogle = (response) => {
    setIsLoading(true);
    let profile = response.getBasicProfile();
    dispatch(isRequestLoginAction(
      profile.getEmail(), 
      "google-oauth2",
      response.accessToken
    ));
  };
  
  const responseFacebook = (response) => {
    setIsLoading(true);
    dispatch(isRequestLoginAction(
      response.userID, 
      "facebook", 
      response.accessToken
    ));
  };

  const onFailureGoogle = () => {
    setIsLoading(false);
    dispatch(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorgoogle} />,
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          preventDuplicate: true,
      },
    }));
  };

  const onFailureFacebook = () => {
    setIsLoading(false);
    dispatch(enqueueSnackbar({
      message: <FormattedMessage {...messages.errorfacebook} />,
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          preventDuplicate: true,
      },
    }));
  }

  

  

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        >
          <Grid item>
            <img
              className={classes.img}
              src={AppBarLogo}
            /> 
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom><FormattedMessage {...messages.logintitle} /></Typography>
            <Divider variant="middle" />
          </Grid>
          
          {isLoading ? (
              <Grid item><CircularProgress/></Grid>
          ) :(
            <>
              <Grid item >
                    <GoogleLogin
                      clientId="293320227396-259msre4c09cbgln6gjl3nsgnc5ja01m.apps.googleusercontent.com"
                      buttonText={
                        <Typography variant="button" gutterBottom>
                          <FormattedMessage {...messages.googlelogin} />
                        </Typography>
                      }
                      className={classes.googleButton}
                      onSuccess={responseGoogle}
                      onFailure={onFailureGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                </Grid>
                <Grid item>
                  <FacebookLogin
                    appId="309252216792222"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon={<FacebookIcon className={classes.fbIcon}/>}
                    buttonStyle={{
                      width: '250px',
                      borderRadius: '2px',
                      height: '46.5px',
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px'
                    }}
                    onFailure={onFailureFacebook}
                    textButton = {
                      <Typography variant="button" gutterBottom>
                        <FormattedMessage {...messages.facebooklogin} />
                      </Typography>
                    }
                    size="small"
                  />
                </Grid>
            </>
          )}
        </Grid>
    </Paper>
  );
}

LoginPageForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPageForm);


