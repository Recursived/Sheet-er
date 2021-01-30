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
  IconButton,
  Tooltip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import {
  appLocales,
  countryToFlag,
  localeLabels
} from 'i18n';

// Importing icons
import SaveIcon from '@material-ui/icons/Save';

// Importing actions and selectors
import {
  makeSelectSheetTypes
} from 'containers/EditingPage/selectors';

import {
  requestSheetTypeAction,
  successSheetTypeAction
} from 'containers/EditingPage/actions';

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

function EditorMenu(props) {
  const classes = useStyles();
  const { sheet_types, dispatch } = props;

  React.useEffect(() => {
    dispatch(requestSheetTypeAction());
  }, []);

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
                    label={<FormattedMessage {...messages.localesheet} />}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={sheet_types}
                autoHighlight
                getOptionLabel={(type) => type.label}
                renderOption={(type) => (
                  <span>{type.label}</span>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label={<FormattedMessage {...messages.labelsheettype} />}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10} sm={10}>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Tooltip title={<FormattedMessage {...messages.tooltipsave} />}>
                <IconButton color="primary">
                  <SaveIcon/>
                </IconButton>
              </Tooltip>
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

EditorMenu.propTypes = {
  sheet_types: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  sheet_types: makeSelectSheetTypes()
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
  memo
)(EditorMenu);
