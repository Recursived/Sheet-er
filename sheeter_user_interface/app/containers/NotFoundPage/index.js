/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box, Button, Container, Grid, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

// Misc imports
import e404image from 'images/Error404.png';
import messages from './messages';
import routes from 'utils/routes';


const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: '15vh'
  },

  img: {
    width: '100%',
    border: `5px solid ${theme.palette.primary.main}`
  },
}));
export function NotFound(props) {
  const { intl, dispatch } = props;
  const classes = useStyle();

  return (
    <Box>
      <Helmet>
        <title>{intl.formatMessage(messages.routeNotfoundpage)}</title>
      </Helmet>
      <Container maxWidth="md" className={classes.container}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <img
              src={e404image}
              className={classes.img}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => dispatch(push(routes.homepage.path))}>
              <FormattedMessage {...messages.buttonreturn}/>
            </Button>
          </Grid>

        </Grid>


      </Container>




    </Box>
  );
}

NotFound.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl
)(NotFound);
