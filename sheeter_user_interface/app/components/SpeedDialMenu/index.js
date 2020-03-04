/**
 *
 * SpeedDialMenu
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import Brightness6Icon from '@material-ui/icons/Brightness6';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const actions = [
  { icon: <Brightness6Icon />, name: <FormattedMessage {...messages.labeltheme} /> },
  { icon: <CreateIcon />, name: <FormattedMessage {...messages.labelsheet} /> },
  { icon: <PersonIcon />, name: <FormattedMessage {...messages.labelprofil} /> },
  { icon: <BuildIcon />, name: <FormattedMessage {...messages.labeloptions} /> },
];

function SpeedDialMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Backdrop />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="left"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
            tooltipPlacement="bottom"
          />
        ))}
      </SpeedDial>
    </>
  );
}

SpeedDialMenu.propTypes = {};

export default SpeedDialMenu;
