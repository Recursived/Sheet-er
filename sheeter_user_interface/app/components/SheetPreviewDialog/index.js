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
  Grid,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (checkSheetExist(editing)) {
      if (editing.link_sheets_data === null) {
        dispatch(requestAddLinkSheet());
      } else {
        setCount(editing.link_sheets_data.count);
      }
    }
  }, [editing]);


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
        {count > 0 ?
          (<InfiniteScroll
            className={classes.infinite}
            dataLength={count}
            next={() => dispatch(requestAddLinkSheet())}
            hasMore={editing.link_sheets_data.length < count}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              {
                editing.link_sheets_data.results.map((data, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <SheetPreviewCard key={index} data={data} onClickHandler={() => dispatch(requestSetLinkIDSheet())} />
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
