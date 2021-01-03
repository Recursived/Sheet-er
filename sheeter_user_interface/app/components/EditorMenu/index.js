/**
 *
 * EditorMenu
 *
 */

import {
  makeStyles,
  Grid,
  Box,
  Divider,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  appLocales,
  countryToFlag,
  localeLabels
} from 'i18n';

// Misc imports
import messages from './messages';

const useStyles = makeStyles(theme => ({

  containermenu: {
    minHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),

    }
  },




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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label={<FormattedMessage {...messages.titlesheet} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={appLocales}
                autoHighlight
                getOptionLabel={(option) => localeLabels[option]}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>{countryToFlag(option)}&nbsp;</span> 
                    {localeLabels[option]} ({option})
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label={<FormattedMessage {...messages.localesheet}/>}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Autocomplete

              /> */}
            </Grid>

          </Grid>
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
