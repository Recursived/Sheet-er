/**
 *
 * NavSearchBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NavSearchBar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NavSearchBar.propTypes = {};

export default memo(NavSearchBar);
