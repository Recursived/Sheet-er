/**
 *
 * NavTabs
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NavTabs() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NavTabs.propTypes = {};

export default NavTabs;
