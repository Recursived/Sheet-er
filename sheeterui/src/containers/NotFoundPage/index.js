/**
 *
 * NotFoundPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components below
import messages from './messages';


export default class NotFoundPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Fragment>
        <FormattedMessage {...messages.helmetNotFoundPageTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>
      </Fragment>
    )
  }
}

