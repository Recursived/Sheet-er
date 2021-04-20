/**
 *
 * MobileSheetPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMobileSheetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function MobileSheetPage(props) {
  useInjectReducer({ key: 'mobileSheetPage', reducer });
  useInjectSaga({ key: 'mobileSheetPage', saga });
  console.log(queryString.parse(props.location.search));

  return (
    <div>
      <Helmet>
        <title>MobileSheetPage</title>
        <meta name="description" content="Description of MobileSheetPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
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
