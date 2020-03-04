/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import { isLogged } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// import components 
import LocaleSelector from 'components/LocaleSelector';
import ThemeToggler from 'components/ThemeToggler';
import SpeedDialMenu from 'components/SpeedDialMenu';

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  
  const dispatch = props.dispatch;
  const isLoggedAction = () => dispatch(isLogged());

  React.useEffect(() =>{
    isLoggedAction();
  }, []);

  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <LocaleSelector></LocaleSelector>
      
      <SpeedDialMenu></SpeedDialMenu>
      <NavLink to="/login">Login</NavLink>
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
