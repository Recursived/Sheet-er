/**
 *
 * HomePage
 *
 */

// import components
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const { dispatch, intl } = props;


  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.routeHomepage)}</title>
      </Helmet>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
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
  injectIntl
)(HomePage);
