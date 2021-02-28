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
  TextField
} from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';


// Misc imports
import messages from './messages';
import LocaleCombo from './LocaleCombo';
import SheetTypeCombo from './SheetTypeCombo';
import SheetTagCombo from './SheetTagCombo';
import TabEditor from './TabEditor';
import GroupButtonEditor from './GroupButtonEditor';

// Importing actions 
import { requestSetTitleSheet, requestAddSheet } from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';


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
  const { buttons, dispatch, editing } = props;

  React.useEffect(() => {
    if (editing.editor_content_sheet !== null &&
      editing.title_sheet !== null &&
      editing.locale_sheet !== null &&
      editing.type_sheet !== null &&
      (editing.tags_sheet !== null && editing.tags_sheet.length > 0)
    ) {
      // When every fields are complete
      dispatch(requestAddSheet());
    }
  }, [editing]);

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
            <Grid item sm={12} lg={8}>
              <GroupButtonEditor />
            </Grid>
            <Grid item sm={12} lg={4}>

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
  editing: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  editing: makeSelectEditingPage()
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
