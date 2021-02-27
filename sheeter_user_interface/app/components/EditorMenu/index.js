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
  ButtonGroup,
  Button,
} from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';


// Importing icons
import SaveIcon from '@material-ui/icons/Save';


// Misc imports
import messages from './messages';
import LocaleCombo from './LocaleCombo';
import SheetTypeCombo from './SheetTypeCombo';
import SheetTagCombo from './SheetTagCombo';
import TabEditor from './TabEditor';

// Importing actions 
import { requestSetTitleSheet } from 'containers/EditingPage/actions';

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
  const { buttons, dispatch } = props;

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
                label={<FormattedMessage {...messages.titlesheet} />}
                onChange={(event) => dispatch(requestSetTitleSheet(event.target.value))}
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
            <Grid item xs={8} sm={8}>
              <ButtonGroup>
                <Tooltip arrow title={<FormattedMessage {...messages.tooltipdeletesheetbutton} />}>
                  <Button><FormattedMessage {...messages.deletesheetbutton} /></Button>
                </Tooltip>
                <Tooltip arrow title={<FormattedMessage {...messages.tooltiplinksheetbutton} />}>
                  <Button><FormattedMessage {...messages.linksheetbutton} /></Button>
                </Tooltip>
                <Tooltip arrow title={<FormattedMessage {...messages.tooltipsheethistorybutton} />}>
                  <Button><FormattedMessage {...messages.sheethistorybutton} /></Button>
                </Tooltip>
              </ButtonGroup>
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
  buttons: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
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
