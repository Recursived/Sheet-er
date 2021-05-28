/**
 *
 * MainSheetDisplay
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, CircularProgress, Grid, makeStyles, Typography, Zoom } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import InfiniteScroll from 'react-infinite-scroller';

// Importing actions & selectors & components
import SheetPreviewCard from 'components/SheetPreviewCard/Loadable';
import makeSelectHomePage from 'containers/HomePage/selectors';
import { requestGetSheetList } from 'containers/HomePage/actions';

// Misc imports
import messages from './messages';


const useStyle = makeStyles((theme) => ({
  cardinfo: {
    paddingTop: '5px',
    backgroundColor: theme.palette.info.light,
    color: theme.palette.getContrastText(theme.palette.info.light)
  },

  cardloading: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.getContrastText(theme.palette.info.light)
  },

  progress: {
    color: theme.palette.getContrastText(theme.palette.grey[400])
  }
}));

function MainSheetDisplay(props) {

  const { dispatch, homepage } = props;
  const classes = useStyle();

  React.useEffect(() => {
    dispatch(requestGetSheetList(homepage.searchfilter));
  }, [homepage]);

  const displayComp = () => {
    if (homepage.loading_sheets) {
      return (<Card className={classes.cardloading}>
        <Typography variant="h4" align="center">
          <CircularProgress className={classes.progress} />
          <FormattedMessage {...messages.loadingtext} />
        </Typography>
      </Card>)
    } else {
      return homepage.sheets_data !== null && homepage.sheets_data.count > 0 ? (
        <InfiniteScroll
          initialLoad={true}
          useWindow={false}
          pageStart={0}
          loadMore={() => {
            dispatch(requestGetSheetList(homepage.searchfilter));
          }}
          hasMore={homepage.sheets_data.results.length < homepage.sheets_data.count}
          loader={
            <Typography variant="h5" align="center">
              <FormattedMessage {...messages.loadingtext} />
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
              homepage.sheets_data.results.map((data, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <SheetPreviewCard
                    variant="profile"
                    key={index}
                    data={data}
                    sheetId={data.id}
                    context={homepage}
                    clickHandler={() => {
                      dispatch(push("sheet/" + data.id));
                    }}
                  />
                </Grid>
              ))
            }
          </Grid>
        </InfiniteScroll>
      ) : (
        <Card className={classes.cardinfo}>
          <Typography variant="h4" align="center">
            <FormattedMessage {...messages.nosheettext} />
          </Typography>
        </Card>
      )
    }
  };

  return displayComp();
}

MainSheetDisplay.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homepage: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage()
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
)(MainSheetDisplay);