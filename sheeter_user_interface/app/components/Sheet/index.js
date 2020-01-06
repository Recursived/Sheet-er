/**
 *
 * Sheet
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/**
 * Component that should be used as a sheet thumbnail in the feed of sheets
 */
function Sheet() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Sheet.propTypes = {};

export default memo(Sheet);
