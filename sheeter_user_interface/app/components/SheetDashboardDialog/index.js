/**
 *
 * SheetDashboardDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  IconButton,
  makeStyles,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
  Divider,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import { push } from 'connected-react-router';


// Icon import
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';


// Importing selectors and actions
import makeSelectProfilePage from 'containers/ProfilePage/selectors';
import {
  requestCloseSheetDialog,
} from 'containers/ProfilePage/actions';

import {
  requestEditSheet,
} from 'containers/EditingPage/actions';



// Misc imports
import messages from './messages';
import routes from 'utils/routes';




const useStyles = makeStyles((theme) => ({


  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  center: {
    textAlign: 'center'
  },

  avatar : {
    backgroundColor: theme.palette.type === "dark" ? "#bdbdbd" : "black"
  },



}));

function SheetDashboardDialog(props) {
  const { dispatch, profilepage } = props;
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
        open={profilepage.sheet_dialog}
        onClose={() => dispatch(requestCloseSheetDialog())}
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.titledialog} values={{ title: profilepage.sheet ? profilepage.sheet.title : "" }} />
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              dispatch(requestCloseSheetDialog());
            }}
            aria-label="close"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <List >
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <VisibilityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={profilepage.sheet ? profilepage.sheet.nb_click : 0}
                secondary={<FormattedMessage {...messages.nbclickitem} />}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <ThumbUpAltIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Coming soon..."
                secondary={<FormattedMessage {...messages.upvoteitem} />}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <ThumbDownIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Coming soon..."
                secondary={<FormattedMessage {...messages.downvoteitem} />}
              />
            </ListItem>
          </List>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Tooltip title={<FormattedMessage {...messages.tooltipeditbutton} />}>
            <Button
              color="primary"
              variant="contained"
              endIcon={<EditIcon />}
              onClick={() => {
                dispatch(requestCloseSheetDialog());
                dispatch(push(routes.editingpage.path))
                dispatch(requestEditSheet())
              }}
            >
              <FormattedMessage {...messages.labelbutton} />
            </Button>
          </Tooltip>
        </DialogActions>

      </Dialog>
    </Box>
  );
}

SheetDashboardDialog.propTypes = {
  profilepage: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage()
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
)(SheetDashboardDialog);
