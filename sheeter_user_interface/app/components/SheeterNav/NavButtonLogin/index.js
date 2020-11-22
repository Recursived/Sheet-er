/**
 *
 * NavButtonLogin
 *
 */

import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';

// Importing icons 
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// Misc import
import messages from './messages';
import { makeSelectPathname } from 'containers/LoginPage/selectors';

const useStyle = makeStyles((theme) => ({
  buttonTextSpan: {
    marginTop: '5px'
  },
}))


function NavButtonLogin(props) {
  const classes = useStyle();
  const { pathname, dispatch } = props;


  return (
    <Button 
      size="large"
      variant="contained" 
      color="primary"
      endIcon={<VpnKeyIcon/>}
      disabled={pathname == "/login" ? true : false}
      onClick={
        () => {
          dispatch(push('/login'));
        }
      }
    >
      <span className={classes.buttonTextSpan}><FormattedMessage {...messages.loginbutton} /></span>
    </Button>
  );
}

NavButtonLogin.propTypes = {
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pathname: makeSelectPathname(),
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

export default compose(withConnect)(NavButtonLogin);
