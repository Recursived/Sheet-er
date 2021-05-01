/**
 *
 * PersonalSheetDisplay
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function PersonalSheetDisplay() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

PersonalSheetDisplay.propTypes = {};

export default memo(PersonalSheetDisplay);
