/**
 *
 * BottomBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BottomBar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

BottomBar.propTypes = {};

export default memo(BottomBar);
