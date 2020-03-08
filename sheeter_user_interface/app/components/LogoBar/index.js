/**
 *
 * LogoBar
 *
 */

import { Container, Tooltip } from '@material-ui/core';
import Image from 'material-ui-image';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './SHEETER-logo-long.png'
import { makeStyles, useTheme } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({

  container: {
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      display:'none'
    },
  }
}));

/**
 * Component of the application dipslaying the logo of Sheeter
 * By clicking, you are redirected to the Homepage
 */
function LogoBar() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Container className={classes.container} maxWidth="xl">
        <NavLink to="/">
          <Image
            animationDuration={1000}
            disableSpinner
            src={Logo}
            color={theme.palette.background.default}
            imageStyle={{
              height:45,
              width:null,
              left:null
            }}
            style={{
              textAlign: 'center',
              paddingTop: 'unset',
              height:45
            }}
          />
        </NavLink>
    </Container>
  );
}

// LogoBar.propTypes = {};

export default LogoBar;
