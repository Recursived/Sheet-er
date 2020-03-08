/**
 *
 * SpeedDialMenu
 *
 */

import { green } from '@material-ui/core/colors';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import BuildIcon from '@material-ui/icons/Build';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { push } from 'connected-react-router';
import { makeSelectIsLoggedIn } from 'containers/HomePage/selectors';
// Import actions
import { changeTheme } from 'containers/ThemeProvider/actions';
// Import Selectors
import { makeSelectThemeProvider } from 'containers/ThemeProvider/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import messages from './messages';





const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
  
  icon: {
    color: theme.palette.background.default
  }
}));





function SpeedDialMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {dispatch, isLogged, theme} = props;
  const [ dark, setDark ] = React.useState(theme.palette.type == "dark");

  let actions = [
    { 
      id: 'themeToggle',
      icon: <Brightness6Icon />, 
      name: <FormattedMessage {...messages.labeltheme} />,
      isLogged: false,
      onClickAction : () => {
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
        dispatch(changeTheme(theme));
        
      },
    },
    { 
      id: 'createSheet',
      icon: <CreateIcon />, 
      name: <FormattedMessage {...messages.labelsheet} />,
      isLogged: true,
      onClickAction : () => {dispatch(push("/sheet"))},

    },
    { 
      id: 'profilVisit',
      icon: <PersonIcon />, 
      name: <FormattedMessage {...messages.labelprofil} />,
      isLogged: true,
      onClickAction : () => {dispatch(push("/profil"))},
    },
    { 
      id: 'optionVisit',
      icon: <BuildIcon />, 
      name: <FormattedMessage {...messages.labeloptions} />,
      isLogged: true,
      onClickAction : () => {dispatch(push("/options"))},
    },
  ];
 


  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  // We filter SpeedDialActions according to loggedIn state
  actions =  actions.filter(item => !item.isLogged || (item.isLogged && isLogged));

  return (
    <>
     
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        className={classes.speedDial}
        icon={<SpeedDialIcon className={classes.icon} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="left"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.id}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() =>{
              setOpen(false);
              action.onClickAction()
            }}
            tooltipPlacement="bottom"
          />
        ))}
      </SpeedDial>
    </>
  );
}

SpeedDialMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  theme: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectIsLoggedIn(),
  theme: makeSelectThemeProvider()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpeedDialMenu);
