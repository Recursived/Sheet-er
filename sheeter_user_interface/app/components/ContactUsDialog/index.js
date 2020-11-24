/**
 *
 * ContactUsDialog
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ContactUsDialog() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ContactUsDialog.propTypes = {};

export default memo(ContactUsDialog);
