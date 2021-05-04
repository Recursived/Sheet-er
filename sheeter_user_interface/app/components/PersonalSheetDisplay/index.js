/**
 *
 * PersonalSheetDisplay
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Grid,
  makeStyles,
  Typography,
  Zoom
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';

// Selectors and actions imports
import makeSelectProfilePage from 'containers/ProfilePage/selectors';
import { 
  requestGetMySheets, 
  requestOpenSheetDialog,
  requestSetSheetData 
} from 'containers/ProfilePage/actions';

// Components import
import SheetPreviewCard from 'components/SheetPreviewCard/Loadable';

// Misc imports
import messages from './messages';


const useStyle = makeStyles((theme) => ({
  cardinfo: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.getContrastText(theme.palette.info.light)
  },

}));



function PersonalSheetDisplay(props) {
  const { dispatch, profilePage } = props;
  const classes = useStyle();

  React.useEffect(() => {
    if (profilePage.sheet_list === null) {
      dispatch(requestGetMySheets());
    }
  }, [profilePage]);


  return (
    <Zoom in={profilePage.sheet_list !== null }>
      {profilePage.sheet_list !== null && profilePage.sheet_list.count > 0 ? (
        <InfiniteScroll
          initialLoad={true}
          useWindow={false}
          pageStart={0}
          loadMore={() => {
            dispatch(requestGetMySheets());
          }}
          hasMore={profilePage.sheet_list.results.length < profilePage.sheet_list.count}
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
              profilePage.sheet_list.results.map((data, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <SheetPreviewCard
                    variant="profile"
                    key={index}
                    data={data}
                    sheetId={data.id}
                    context={profilePage}
                    clickHandler={() => {
                      dispatch(requestSetSheetData(data));
                      dispatch(requestOpenSheetDialog())
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
      )}
    </Zoom>
  );
}

PersonalSheetDisplay.propTypes = {
  profilePage: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage()
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
)(PersonalSheetDisplay);