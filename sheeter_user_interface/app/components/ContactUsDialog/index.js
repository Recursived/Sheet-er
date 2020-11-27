/**
 *
 * ContactUsDialog
 *
 */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, ListSubheader, makeStyles, MenuItem, Select, Slide, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
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
import CategorySelector from './CategorySelector';



const useStyle = makeStyles((theme) => ({
  closeButton : {
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [ isFinal, setFinal] = React.useState(false);
  const { contactDialog, dispatch } = props;

  return (
    <Dialog
      fullWidth
      open={contactDialog} 
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      className={classes.contentdialog}
      classes={{
        paper: classes.contentdialog
      }}
    >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.titledialog}/>
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
              <CategorySelector/>
            </Grid>
            <Grid item>
              <TextField
                multiline
                rowsMax={5}
                variant="outlined"
                label={<FormattedMessage {...messages.labeltextfield}/>}
                className={classes.textfield}
              />
            </Grid>
            
          </Grid>
            
            

          
        </DialogContent>
        <DialogActions>
          <Button onClose={() => dispatch(closeContactDialogAction())} color="primary">
            <FormattedMessage {...messages.cancelbutton}/>
          </Button>
          <Button color="primary">
            <FormattedMessage {...messages.sendbutton}/>
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
