/**
 *
 * AboutSetting comp
 * folder copied from BottomBar
 *
 */

import React, { memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Divider } from '@material-ui/core';


function AboutSetting(props) {
  const {
    dispatch,
    theme,
    user_info
  } = props;

  return (
    <CardContent>
      <Typography color="textPrimary" variant="h6" gutterBottom>
        <FormattedMessage {...messages.titlehelpeditorsection} />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage {...messages.bodyhelpeditor} />
      </Typography>

      <a href="http://asciimath.org/">
        <Typography color="textSecondary">
          http://asciimath.org/
          </Typography>
      </a>


    </CardContent>
  );
}

AboutSetting.propTypes = {};

export default memo(AboutSetting);
