/**
 *
 * ThemeToggler
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { createMuiTheme } from '@material-ui/core/styles';

import messages from './messages';
import { Tooltip } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';




// Import actions
import { changeTheme } from 'containers/ThemeProvider/actions';

// Import Selectors
import { makeSelectThemeProvider } from 'containers/ThemeProvider/selectors';



function ThemeToggler(props) {
  const [ dark, setDark ] = React.useState(props.theme.palette.type == "dark");
  
  const onClickHandler = () => {
    setDark(!dark);
    const theme = createMuiTheme({
      palette: {
        type: dark ? 'light' : 'dark',
      },
    });
    props.onThemeToggle(theme)
  };

  return (
    <Tooltip title={<FormattedMessage {...messages.header} />} arrow>
      <IconButton onClick={onClickHandler}>
        {dark ? <Brightness5Icon/> : <Brightness4Icon/>}
      </IconButton>
    </Tooltip>
     
      
    
  );
}

ThemeToggler.propTypes = {
  onThemeToggle: PropTypes.func,
  theme: PropTypes.object
};

const mapStateToProps = createSelector(
  makeSelectThemeProvider(),
  theme => ({theme})
);

function mapDispatchToProps(dispatch) {
  return {
    onThemeToggle: theme => dispatch(changeTheme(theme)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeToggler);
