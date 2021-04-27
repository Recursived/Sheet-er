/**
 *
 * ProfileCard
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProfileCard() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ProfileCard.propTypes = {};

export default memo(ProfileCard);
