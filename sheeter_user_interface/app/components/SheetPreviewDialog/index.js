/**
 *
 * SheetPreviewDialog
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Importing selectors and actions
import makeSelectEditingPage from 'containers/EditingPage/selectors';
import { requestOpenLinkSheetDialog } from 'containers/EditingPage/actions';


// Misc imports
import messages from './messages';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function SheetPreviewDialog(props) {
  const { dispatch, editing } = props;
  const classes = useStyles();

  return (
    <Dialog fullScreen open={editing.link_dialog_open} onClose={() => dispatch(requestOpenLinkSheetDialog(false))} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => dispatch(requestOpenLinkSheetDialog(false))} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <FormattedMessage {...messages.titledialog} />
          </Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}

SheetPreviewDialog.propTypes = {
  editing: makeSelectEditingPage()
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
)(SheetPreviewDialog);
