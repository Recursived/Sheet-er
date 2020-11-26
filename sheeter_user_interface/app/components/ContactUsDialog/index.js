/**
 *
 * ContactUsDialog
 *
 */

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';


// Importing icons
import CloseIcon from '@material-ui/icons/Close';

// Importing actions and selectors
import { makeSelectContactDialog } from 'containers/App/selectors';
import { 
  closeContactDialogAction,
  openContactDialogAction
} from 'containers/App/actions';

// Misc imports
import messages from './messages';




const useStyle = makeStyles((theme) => ({
  closeButton : {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

}));

function ContactUsDialog(props) {
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { contactDialog, dispatch } = props;

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      open={contactDialog}
      fullScreen={fullScreen}
      className={classes.dialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        
        >
          <Grid item>
            <FormattedMessage {...messages.titledialog} /> 
          </Grid>
          <Grid item>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => dispatch(closeContactDialogAction())}
            >
              <CloseIcon/>
            </IconButton>
          </Grid>
        </Grid>
        
        
      </DialogTitle>
      <DialogContent dividers>
        
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          autoFocus
        >
          <FormattedMessage {...messages.sendbutton} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ContactUsDialog.propTypes = {
  contactDialog: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  contactDialog: makeSelectContactDialog(),
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
)(ContactUsDialog);
