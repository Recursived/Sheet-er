/**
 *
 * SheetPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from "react-router";
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import actions and selectors
import makeSelectSheetPage from './selectors';
import { requestGetSheetInfoAction } from './actions';

// Importing components
import SheetDisplayer from 'components/SheetDisplayer/Loadable';
import TopSheetDisplayer from 'components/SheetDisplayer/TopSheetDisplayer';
import BottomSheetDisplayer from 'components/SheetDisplayer/BottomSheetDisplayer';

// Misc imports
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(theme => ({

  container: {
    marginTop: theme.spacing(8)
  }
}));

export function SheetPage(props) {
  const { dispatch, match, sheetPage } = props;
  const classes = useStyles();
  useInjectReducer({ key: 'sheetPage', reducer });
  useInjectSaga({ key: 'sheetPage', saga });

  React.useEffect(() => {
    if (sheetPage.id_sheet == null) {
      dispatch(requestGetSheetInfoAction(match.params.id));
    }
  }, [sheetPage]);

  return (
    <div>
      <Helmet>
        <title>SheetPage</title>
        <meta name="description" content="Description of SheetPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <Container maxWidth="md" className={classes.container}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid xs={12} item>
            <TopSheetDisplayer />
          </Grid>
          <Grid xs={12} item>
            <SheetDisplayer />
          </Grid>
          <Grid xs={12} item>
            <BottomSheetDisplayer />
          </Grid>

        </Grid>

      </Container>

    </div>
  );
}

SheetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sheetPage: makeSelectSheetPage(),
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
  memo,
  withRouter
)(SheetPage);
