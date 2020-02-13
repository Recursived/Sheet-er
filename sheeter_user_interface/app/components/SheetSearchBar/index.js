/**
 *
 * SheetSearchBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SheetSearchBar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SheetSearchBar.propTypes = {};

export default memo(SheetSearchBar);
