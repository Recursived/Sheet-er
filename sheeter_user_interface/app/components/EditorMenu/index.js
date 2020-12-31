/**
 *
 * EditorMenu
 *
 */

import { makeStyles, Grid, Box, Divider } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

// Misc imports
import messages from './messages';

const useStyles = makeStyles(theme => ({

  containermenu: {
    minHeight: '100%'
  }

}));

function EditorMenu() {
  const classes = useStyles();
  return (
    <Box className={classes.containermenu}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          fezmfzeml,
        </Grid>
        <Divider />
        <Grid item>
          efmlzjfze
        </Grid>
        <Divider />
        <Grid item>
          ochcazohoaz
        </Grid>
      </Grid>
    </Box>
  );
}

EditorMenu.propTypes = {};

export default memo(EditorMenu);
