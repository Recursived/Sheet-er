/**
 *
 * LandingPageForm
 *
 */

import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Tooltip,
  Typography
} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';

import GoogleLogin  from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FormattedMessage } from 'react-intl';
import React from 'react';

import AppBarLogo from 'images/logo_appbar.png';
import messages from './messages';

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

// Debug function
const responseGoogle = (response) => {
  console.log(response);
  let basicProfile = response.getBasicProfile();
  // console.log(basicProfile);
}

const responseFacebook = (response) => {
  console.log(response);
}
// -----------------------------

function LoginPageForm() {
  const classes = useStyles();
  

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
          
          <Grid item>
              <GoogleLogin
                clientId="293320227396-259msre4c09cbgln6gjl3nsgnc5ja01m.apps.googleusercontent.com"
                buttonText={
                  <Typography variant="button" gutterBottom>
                    <FormattedMessage {...messages.googlelogin} />
                  </Typography>
                }
                className={classes.googleButton}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
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
              textButton = {
                <Typography variant="button" gutterBottom>
                  <FormattedMessage {...messages.facebooklogin} />
                </Typography>
              }
              size="small"
            />
          </Grid>
        </Grid>
    </Paper>
  );
}

LoginPageForm.propTypes = {};

export default LoginPageForm;


