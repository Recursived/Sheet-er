/**
 *
 * DashboardCard
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DashboardCard() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DashboardCard.propTypes = {};

export default memo(DashboardCard);
