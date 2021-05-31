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
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

// Utils imports
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Components imports
import SheetDisplayer from 'components/SheetDisplayer/Loadable';
import TopSheetDisplayer from 'components/SheetDisplayer/TopSheetDisplayer';

// Misc imports
import makeSelectMobileSheetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestGetSheet } from './actions';
import { ErrorBoundary } from 'utils/utils';
import messages from './messages';



const useStyles = makeStyles(theme => ({

  container: {
    marginTop: theme.spacing(10)
  },

  errormessage: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '35vh'

    },
    paddingTop: '50vh'
  }
}));

export function MobileSheetPage(props) {
  const classes = useStyles();
  const { dispatch, intl, mobileSheetPage } = props;
  useInjectReducer({ key: 'mobileSheetPage', reducer });
  useInjectSaga({ key: 'mobileSheetPage', saga });
  const qsdata = queryString.parse(props.location.search);
  console.log(qsdata);

  React.useEffect(() => {
    dispatch(requestGetSheet(qsdata.id_sheet, qsdata.token));
    console.log("test");
  }, []);




  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.sheetroute, {title: mobileSheetPage.sheet === null ? "" : mobileSheetPage.sheet.title})}</title>
        <meta name="description" content="Description of SheetPage" />
      </Helmet>
      
      <ErrorBoundary
        error={<Typography className={classes.errormessage} variant="h3" align="center"><FormattedMessage {...messages.errordisplaysheet} /></Typography>}
      >
        <Container maxWidth="md" className={classes.container}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={2}
          >
            <Grid xs={12} item>
              <TopSheetDisplayer data={mobileSheetPage.sheet} />
            </Grid>
            <Grid xs={12} item>
              <SheetDisplayer data={mobileSheetPage.sheet} />
            </Grid>
          </Grid>

        </Container>
      </ErrorBoundary>
    </div>
  );
}

MobileSheetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  mobileSheetPage: PropTypes.object.isRequired
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
  injectIntl
)(MobileSheetPage);
