/**
 *
 * AboutSetting comp
 * folder copied from BottomBar
 *
 */

import React, { memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function AboutSetting(props) {
  const {
    dispatch,
    theme,
    user_info
  } = props;

  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        About Sheeter
      </Typography>
    </CardContent>
  );
}

AboutSetting.propTypes = {};

export default memo(AboutSetting);
