/**
 *
 * NavDropMenu
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NavDropMenu() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NavDropMenu.propTypes = {};

export default NavDropMenu;
