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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import actions and selectors
import makeSelectSheetPage from './selectors';
import { requestGetSheetInfoAction } from './actions';

// Misc imports

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function SheetPage(props) {
  const { dispatch, match, sheetPage } = props;

  useInjectReducer({ key: 'sheetPage', reducer });
  useInjectSaga({ key: 'sheetPage', saga });
  
  React.useEffect(() => {
    if (sheetPage.id_sheet == null){
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
