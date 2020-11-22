/**
 *
 * NavDropMenu
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

// Import material core elems
import { 
  IconButton      
} from '@material-ui/core';

// Importing icons
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';


import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NavDropMenu() {
  return (
    <IconButton
      edge="start"
      color="primary"
      className={classes.menuButton}
      ref={anchorRef}
      aria-controls={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      <ArrowDropDownSharpIcon />
    </IconButton>
  );
}

NavDropMenu.propTypes = {};

export default NavDropMenu;
