/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SheeterEditor() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SheeterEditor.propTypes = {};

export default memo(SheeterEditor);
