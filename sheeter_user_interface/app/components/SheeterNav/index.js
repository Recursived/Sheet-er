/**
 *
 * SheeterNav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';


// Import material core elems
import {
  Grid, Hidden,
  AppBar, Toolbar, 
} from '@material-ui/core';

// Importing components
import NavSearchBar from './NavSearchBar/Loadable';
import NavTabs from './NavTabs/Loadable';
import NavButtonLogin from './NavButtonLogin/Loadable';
import HamburgerMenu from './HamburgerMenu/Loadable';
import NavDropMenu from './NavDropMenu/Loadable';

//Selector imports
import { makeSelectLoggedIn } from 'containers/App/selectors';

// Misc imports
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import routes from 'utils/routes';
import messages from './messages';

import AppBarLogo from 'images/logo_appbar.png';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  img: {
    height: "45px",
  },


}));


function SheeterNav(props) {
  const classes = useStyles();
  const isLogged = props.isLogged;

  return (
    <div>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                spacing={2}
                alignItems="center"
              >
                {isLogged ? (
                  <HamburgerMenu />
                ) : (
                    <></>
                  )}
                <Grid item>
                  <Link
                    to={isLogged ? 
                      routes.homepage.path :
                      routes.landingpage.path 
                    }
                  >
                    <img
                      className={classes.img}
                      src={AppBarLogo}
                    />
                  </Link>
                </Grid>
                {isLogged ? (
                  <Hidden smDown>
                    <Grid item>
                      <NavTabs />
                    </Grid>
                  </Hidden>
                ) : (
                    <></>
                  )}

              </Grid>
            </Grid>
            <Grid item>
              <NavSearchBar />
            </Grid>
            <Grid item>
              {isLogged ? (
                <NavDropMenu />
              ) : (
                  <NavButtonLogin />
                )}

            </Grid>
          </Grid>
        </Toolbar>

      </AppBar>
    </div>
  );
}

SheeterNav.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectLoggedIn(),
});

const withConnect = connect(
  mapStateToProps,
);

export default compose(withConnect)(SheeterNav);
