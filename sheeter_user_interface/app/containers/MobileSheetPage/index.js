/**
 *
 * MobileSheetPage
 *
 */

import React, { memo } from 'react';
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

// Utils imports
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Components imports
import SheetDisplayer from 'components/SheetDisplayer/Loadable';
import TopSheetDisplayer from 'components/SheetDisplayer/TopSheetDisplayer';
import BottomSheetDisplayer from 'components/SheetDisplayer/BottomSheetDisplayer';

// Misc imports
import makeSelectMobileSheetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(theme => ({

  container: {
    marginTop: theme.spacing(10)
  }
}));

export function MobileSheetPage(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'mobileSheetPage', reducer });
  useInjectSaga({ key: 'mobileSheetPage', saga });
  console.log(queryString.parse(props.location.search));

  return (
    <div>
      <Helmet>
        <title>MobileSheetPage</title>
        <meta name="description" content="Description of MobileSheetPage" />
      </Helmet>
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

MobileSheetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mobileSheetPage: makeSelectMobileSheetPage(),
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
)(MobileSheetPage);