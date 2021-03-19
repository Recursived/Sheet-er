/**
 *
 * SheetPreviewDialog
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SheetPreviewDialog() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SheetPreviewDialog.propTypes = {};

export default memo(SheetPreviewDialog);
