/**
 *
 * ContactUsDialog
 *
 */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  IconButton
} from '@material-ui/core';


import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';


// Importing icons
import CloseIcon from '@material-ui/icons/Close';

// Importing actions and selectors
import { 
  makeSelectContactDialog,
  makeSelectUserInfo
} from 'containers/App/selectors';
import {
  closeContactDialogAction,
  isSendResponseRequestAction
} from 'containers/App/actions';

// Misc imports
import messages from './messages';
import CategorySelector from './CategorySelector';



const useStyle = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  textfield: {
    width: '100%'
  },

  contentdialog: {
    overflowY: 'unset'
  },

  select: {
    width: '100%'
  }
}));

function ContactUsDialog(props) {
  const classes = useStyle();
  const { contactDialog, userInfo, dispatch } = props;

  const [disabled, setDisabled] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [selectorVal, setSelectorVal] = React.useState("");

  const handleClose = () => {
    dispatch(closeContactDialogAction());
    setDisabled(true);
    setMessage("");
    setSelectorVal("");
  };

  React.useEffect(() => {

    if (selectorVal !== ""
      && selectorVal !== undefined
      && message.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message, selectorVal]);



  return (
    <Dialog
      fullWidth
      open={contactDialog === undefined ? false : contactDialog}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      className={classes.contentdialog}
      classes={{
        paper: classes.contentdialog
      }}
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage {...messages.titledialog} />
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        classes={{
          root: classes.contentdialog
        }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <CategorySelector value={selectorVal} handler={(event) => setSelectorVal(event.target.value)} />
          </Grid>
          <Grid item>
            <TextField
              multiline
              rowsMax={5}
              variant="outlined"
              label={<FormattedMessage {...messages.labeltextfield} values={{ char: message.length, }} />}
              className={classes.textfield}
              inputProps={{ maxLength: 1000 }}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={disabled}
          onClick={() => {
            dispatch(isSendResponseRequestAction({
              author: userInfo.user.id,
              content: message,
              category: selectorVal
            }));
            handleClose();
          }}
        >
          <FormattedMessage {...messages.sendbutton} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ContactUsDialog.propTypes = {
  userInfo: PropTypes.object.isRequired,
  contactDialog: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  contactDialog: makeSelectContactDialog(),
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
  memo
)(ContactUsDialog);
