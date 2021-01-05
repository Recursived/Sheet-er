/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';
import { Box } from '@material-ui/core';

export function NotFound(props) {
  const intl = props.intl;

  return (
    <Box>
      <Helmet>
        <title>{intl.formatMessage(messages.routeNotfoundpage)}</title>
      </Helmet>
      <h1>
      <FormattedMessage {...messages.header} />
      </h1>
      <h1>
      <FormattedMessage {...messages.header} />
      </h1>
      
      


    </Box>
  );
}

NotFound.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};


export default compose(
  injectIntl
)(NotFound);
