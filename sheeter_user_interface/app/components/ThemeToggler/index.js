/**
 *
 * ThemeToggler
 *
 */

import { Tooltip } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import Fab from '@material-ui/core/Fab';
import { createMuiTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
// Import actions
import { changeTheme } from 'containers/ThemeProvider/actions';
// Import Selectors
import { makeSelectThemeProvider } from 'containers/ThemeProvider/selectors';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import messages from './messages';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles(theme => ({
  fab : {
    position: 'absolute',
    top: theme.spacing(2),
    right : theme.spacing(2),
    color: theme.palette.background.default
  }
}));





function ThemeToggler(props) {
  const [ dark, setDark ] = React.useState(props.theme.palette.type == "dark");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  
  const onClickHandler = () => {
    setDark(!dark);
    const theme = createMuiTheme({
      palette: {
        primary: green,
        secondary: {
          main: '#c8e6c9',
        },
        type: dark ? 'light' : 'dark',
      },
    });
    props.onThemeToggle(theme)
    enqueueSnackbar("changement de theme",{
      variant: 'info'
    })
  };

  return (
    <Tooltip title={<FormattedMessage {...messages.header} />} arrow>
      <Fab size="medium" className={classes.fab} color="primary" onClick={onClickHandler}>
        {dark ? <Brightness5Icon/> : <Brightness4Icon/>}
      </Fab>
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
