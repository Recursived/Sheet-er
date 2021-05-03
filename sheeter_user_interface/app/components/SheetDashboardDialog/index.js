/**
 *
 * SheetDashboardDialog
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SheetDashboardDialog() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SheetDashboardDialog.propTypes = {};

export default memo(SheetDashboardDialog);
