/**
 *
 * SheetPreviewDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Slide,
  Dialog,
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfiniteScroll from 'react-infinite-scroller';

// Importing selectors and actions
import makeSelectEditingPage from 'containers/EditingPage/selectors';
import {
  requestAddLinkSheet,
  requestOpenLinkSheetDialog,
  requestSetLinkIDSheet
} from 'containers/EditingPage/actions';


// Misc imports
import messages from './messages';
import SheetPreviewCard from 'components/SheetPreviewCard';
import { checkSheetExist } from 'utils/utils';

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

  center: {
    textAlign: 'center'
  },

  infinite: {
    overflow: 'unset!important'
  }
}));

function SheetPreviewDialog(props) {
  const { dispatch, editing } = props;
  const classes = useStyles();

  React.useEffect(() => {
    if (checkSheetExist(editing)) {
      if (editing.link_sheets_data === null) {
        dispatch(requestAddLinkSheet());
      }
    }
  }, [editing]);



  // problème de doublon --> verif
  return (
    <Dialog fullScreen open={editing.link_dialog_open} onClose={() => dispatch(requestOpenLinkSheetDialog(false))} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => {
            dispatch(requestOpenLinkSheetDialog(false));
          }} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <FormattedMessage {...messages.titledialog} />
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {editing.link_sheets_data !== null ?
          (<InfiniteScroll
            initialLoad={false}
            useWindow={false}
            pageStart={0}
            loadMore={() => {
              dispatch(requestAddLinkSheet());
            }}
            hasMore={editing.link_sheets_data.results.length < editing.link_sheets_data.count}
            loader={
              <Typography variant="h5" align="center">
                Loading...
            </Typography>
            }

          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              {
                editing.link_sheets_data.results.map((data, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <SheetPreviewCard
                      variant="link"
                      key={index}
                      data={data}
                      sheetId={data.id}
                      context={editing}
                      clickHandler={() => {
                        dispatch(requestSetLinkIDSheet(data.id));
                        dispatch(requestOpenLinkSheetDialog(false))
                      }}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </InfiniteScroll>
          ) : (
            <DialogContentText className={classes.center}>
              <Typography variant="h4" gutterBottom>
                <FormattedMessage {...messages.emptysheetdialog} />
              </Typography>
            </DialogContentText>
          )}
      </DialogContent>


    </Dialog>
  );
}

SheetPreviewDialog.propTypes = {
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
)(SheetPreviewDialog);
