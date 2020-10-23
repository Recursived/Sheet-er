/**
 *
 * HomePage
 *
 */

// import components
import LocaleSelector from 'components/LocaleSelector';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { isLoggedAction, getSheetsAction } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const { dispatch } = props;
  const homePageInit = () => {
    dispatch(isLoggedAction());
    dispatch(getSheetsAction());
  }

  React.useEffect(() => {
    homePageInit();
  }, []);

  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default compose(withConnect)(HomePage);
