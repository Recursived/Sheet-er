/**
 *
 * FilterSheetType
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function FilterSheetType() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

FilterSheetType.propTypes = {};

export default memo(FilterSheetType);
