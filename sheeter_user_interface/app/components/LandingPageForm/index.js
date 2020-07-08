/**
 *
 * LandingPageForm
 *
 */

import {
  makeStyles,
  ListSubheader,
  List,
  ListItem,
} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';

import GoogleLogin  from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import TabPanel from './TabPanel';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
    border : theme.palette.background.default,
    width: '100%'
  },

  googlebutton : {
    width : 'inherit',
    padding: "calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)!important",
    display: 'inline-block!important',
    border: "calc(.06887vw + .67769px)",
    '& span' : {
      textAlign: 'center',
      width: 'inherit',
      color: 'black',
      fontSize: 'calc(.27548vw + 12.71074px)',
      fontWeight: '700',
      textTransform: 'uppercase',
      padding: 'unset!important'
    },
    '& div': {
      margin: 'unset!important',
      padding: 'unset!important',


    }
  },

  listheader: {
    textAlign: 'center'
  }


}));

// Debug function
const responseGoogle = (response) => {
  console.log(response);
}

const responseFacebook = (response) => {
  console.log(response);
}
// -----------------------------

function LandingPageForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader
          className={classes.listheader}
        >
          <FormattedMessage {...messages.logintitle}/>
        </ListSubheader>
      }
    >
      <ListItem>
          <GoogleLogin
            className={classes.googlebutton}
            clientId="293320227396-259msre4c09cbgln6gjl3nsgnc5ja01m.apps.googleusercontent.com"
            buttonText={<FormattedMessage {...messages.googlelogin} />}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
      </ListItem>
      <ListItem>
        <FacebookLogin
          containerStyle={
            {
              width: 'inherit',
              
            }
          }
          buttonStyle={
            {
              width: 'inherit',
              borderRadius: '2px',
              boxShadow : 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px'
            }
          }
          appId="1583503951799517"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon={<div><FacebookIcon/></div>}
          text = {<FormattedMessage {...messages.facebooklogin} />}
          size="small"
        />
      </ListItem>
    </List>
  );
}

LandingPageForm.propTypes = {};

export default LandingPageForm;
