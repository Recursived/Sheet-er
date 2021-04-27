/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import selectors
import { makeSelectUserInfo } from 'containers/App/selectors';
import makeSelectProfilePage from './selectors';

// Misc imports 
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ProfilePage(props) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const { dispatch, intl, profilePage, userInfo } = props;
  const name = userInfo.user.first_name + " "
    + userInfo.user.last_name;


  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.profileroute, { name: name })}</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
    </div>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  profilePage: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
  userInfo: makeSelectUserInfo()
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
)(ProfilePage);
