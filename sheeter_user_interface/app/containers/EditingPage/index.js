/**
 *
 * EditingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEditingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function EditingPage() {
  useInjectReducer({ key: 'editingPage', reducer });
  useInjectSaga({ key: 'editingPage', saga });

  return (
    <div>
      <Helmet>
        <title>EditingPage</title>
        <meta name="description" content="Description of EditingPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

EditingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editingPage: makeSelectEditingPage(),
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

export default compose(withConnect)(EditingPage);
