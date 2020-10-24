/**
 *
 * LandingPage
 *
 */

import { Container, Grid, Hidden, Paper, Divider, Typography } from '@material-ui/core';
import { LoremIpsum, Avatar } from "react-lorem-ipsum";
import { makeStyles } from '@material-ui/core/styles';

// Import components
import CarouselLanding from 'components/CarouselLanding';

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectLandingPage from './selectors';



const useStyles = makeStyles(theme => ({
  containercarousel: {
    margin: 0,
    padding: 0,
  },

  container : {
    paddingTop: '80px',
  },

  containerBottomBar : {
    marginTop: 100,
    height: 80,
    textAlign: 'center',
    padding : theme.spacing(2),
  },

  itemAppli : {
    padding : theme.spacing(2),
    height : 500
  },

  image : {
    width: '100%',
    height: 'auto',
  }
}));

export function LandingPage() {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const classes = useStyles();
  return (
    <Container className={classes.containercarousel} maxWidth="xl">
      <FormattedMessage id="app.containers.LandingPage.title">
        {title => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <Hidden only="xs">
        <CarouselLanding></CarouselLanding>
        <Container className={classes.container} maxWidth="lg">
          <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
          >
            <Grid item xs={12}  sm={4}>
              <img src="https://picsum.photos/300"></img>
            </Grid>
            <Grid item xs={12}  sm={8}>
              <LoremIpsum
                avgSentencesPerParagraph={14}
              />
            </Grid>
          </Grid>
          <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
          >
            <Grid item xs={12}  sm={8}>
              <LoremIpsum
                avgSentencesPerParagraph={14}
              />
            </Grid>
            <Grid item xs={12}  sm={4}>
              <img src="https://picsum.photos/300"></img>
            </Grid>
          </Grid>
          <Grid className={classes.container} container spacing={3}>
            <Grid item xs={12}  sm={4}>
              <Paper square>
              <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  className={classes.itemAppli}
                >
                  <Grid item>
                    <Avatar gender="male"/>
                    
                  </Grid>
                  
                  <Grid item>
                  <Divider variant="middle" />
                    <Typography gutterBottom variant="body1">
                      <LoremIpsum
                        avgWordsPerSentence={4}
                        avgSentencesPerParagraph={4}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}  sm={4}>
              <Paper square>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  className={classes.itemAppli}
                >
                  <Grid item>
                    <Avatar gender="male"/>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid item>
                  <Divider variant="middle" />
                    <Typography gutterBottom variant="body1">
                      <LoremIpsum
                        avgWordsPerSentence={4}
                        avgSentencesPerParagraph={4}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}  sm={4}>
              <Paper square>
              <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  className={classes.itemAppli}
                >
                  <Grid item>
                    <Avatar gender="male"/>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid item>
                  <Divider variant="middle" />
                    <Typography gutterBottom variant="body1">
                      <LoremIpsum
                        avgWordsPerSentence={4}
                        avgSentencesPerParagraph={4}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.container}
          >
          </Grid>
        </Container>
      </Hidden>
      <Hidden smUp>
            <img
              className={classes.image}
              src="https://i.pinimg.com/originals/05/61/8e/05618ee233c7bf7e4f0bc1e2b9173f0d.jpg" 
              alt="Image promotion application mobile">
            </img>
      </Hidden>
      <Paper className={classes.containerBottomBar}>
          Sheeter - Tous droits réservés
      </Paper>
    </Container>
    
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
