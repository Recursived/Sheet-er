/**
 *
 * ProfileCard
 *
 */

import React, { memo } from 'react';
import { Avatar, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

// Import selectors
import { makeSelectUserInfo } from 'containers/App/selectors';

// Misc imports
import messages from './messages';



const useStyles = makeStyles((theme) => ({

  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(3)
  },

  paper: {
    padding: theme.spacing(2),
    height: '100%'
  },

  center: {
    textAlign: 'center'
  }
}));

function ProfileCard(props) {
  const classes = useStyles();
  const { userInfo, intl } = props;
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom><FormattedMessage {...messages.titelprofilecard} /></Typography>
      <Paper variant="outlined" className={classes.paper}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid xs={12} md={4} item>
            <Avatar className={classes.avatar}>
              {userInfo.user.first_name.charAt(0) + userInfo.user.last_name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid xs={12} md={8} item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                >
                  <FormattedMessage
                    {...messages.messageusername}
                  />
                </Typography>
                <Typography
                  variant="subtitle2"

                >
                  {userInfo.user.username}
                </Typography>

              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"

                >
                  <FormattedMessage
                    {...messages.messagemail}
                  />
                </Typography>
                <Typography
                  variant="subtitle2"

                >
                  {userInfo.user.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                >
                  <FormattedMessage
                    {...messages.messagefirstname}
                  />
                </Typography>
                <Typography
                  variant="subtitle2"

                >
                  {userInfo.user.first_name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                >
                  <FormattedMessage
                    {...messages.messagelastname}
                  />
                </Typography>
                <Typography
                  variant="subtitle2"

                >
                  {userInfo.user.last_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  display="block"
                  className={classes.center}
                  gutterBottom
                >
                  <FormattedMessage
                    {...messages.messagedatejoined}
                    values={{
                      date: intl.formatDate(new Date(userInfo.user.date_joined), {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })
                    }}
                  />

                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Paper>
    </React.Fragment>
  );
}

ProfileCard.propTypes = {
  userInfo: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};


const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo()
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
  injectIntl
)(ProfileCard);
