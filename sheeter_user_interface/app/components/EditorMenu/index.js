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
  Tooltip
} from '@material-ui/core';
import React, { memo } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

// Importing icons
import PostAddIcon from '@material-ui/icons/PostAdd';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DoneAllIcon from '@material-ui/icons/DoneAll';

// Misc imports
import messages from './messages';
import LocaleCombo from './LocaleCombo';
import SheetTypeCombo from './SheetTypeCombo';
import SheetTagCombo from './SheetTagCombo';
import TabEditor from './TabEditor';
import GroupButtonEditor from './GroupButtonEditor';
import { checkSheetComplete, localeToCode } from 'utils/utils';


// Importing actions and selector
import { requestSetTitleSheet, requestSetDescrSheet } from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';
import { makeSelectLocale } from 'providers/LanguageProvider/selectors';


const useStyles = makeStyles(theme => ({
  containermenu: {
    minHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),

    }
  },
  
  sheetstatus: {
    textAlign: 'center',
    paddingTop: '10px!important',
  },

  statusicon: {
    fontSize: '3.5vh'
  }
}));

function EditorMenu(props) {
  const classes = useStyles();
  const { buttons, dispatch, editing, locale } = props;
  const [titleValue, setTitleValue] = React.useState("");
  const [descrValue, setDescrValue] = React.useState("");
  
  const saveTitleSheet = React.useCallback(
    debounce((title) => {
      dispatch(requestSetTitleSheet(title));
    }, 1000),
    []
  );
  const saveDescrSheet = React.useCallback(
    debounce((title) => {
      dispatch(requestSetDescrSheet(title));
    }, 1000),
    []
  );

  let statusIcon = null;
  React.useEffect(() => {
    setTitleValue(editing.title_sheet ? editing.title_sheet : "");
    setDescrValue(editing.descr_sheet ? editing.descr_sheet : "");
  }, [editing]);


  
  if (editing.loading) {
    statusIcon =
      <Tooltip aria-label="Saving sheet" title={<FormattedMessage {...messages.tooltipsheetissaving} />}>
        <HourglassEmptyIcon className={classes.statusicon} />
      </Tooltip>;
  } else if (checkSheetComplete(editing)) {
    statusIcon =
      <Tooltip aria-label="Sheet saved"
        title={
          <FormattedMessage {...messages.tooltipsheetsaved}
            values={{
              lasttime: new Date().toLocaleString(localeToCode[locale])
            }} />
        }>
        <DoneAllIcon className={classes.statusicon} />
      </Tooltip>;
  } else {
    statusIcon =
      <Tooltip aria-label="Sheet is invalid or non existant" title={<FormattedMessage {...messages.tooltipsheetnonexistant} />}>
        <PostAddIcon className={classes.statusicon} />
      </Tooltip>;
  }

  return (
    <Box className={classes.containermenu}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={5}
      >
        <Grid xs={12} item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={titleValue}
                label={<FormattedMessage {...messages.titlesheet} />}
                onChange={(event) => {
                  setTitleValue(event.target.value);
                  saveTitleSheet(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={descrValue}
                label={<FormattedMessage {...messages.descrsheet} />}
                onChange={(event) => {
                  setDescrValue(event.target.value);
                  saveDescrSheet(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocaleCombo />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SheetTypeCombo />
            </Grid>
            <Grid item xs={12} sm={12}>
              <SheetTagCombo />
            </Grid>
            <Grid item sm={12} lg={8}>
              <GroupButtonEditor />
            </Grid>
            <Grid item sm={12} lg={4} className={classes.sheetstatus}>
              {statusIcon}
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid xs={12} item>
          <Grid container>
            <Grid item xs={12}>
              <TabEditor buttons={buttons} />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          En cours d'élaboration
        </Grid>
      </Grid>
    </Box>
  );
}

EditorMenu.propTypes = {
  buttons: PropTypes.object.isRequired,
  editing: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = createStructuredSelector({
  editing: makeSelectEditingPage(),
  locale: makeSelectLocale()
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
