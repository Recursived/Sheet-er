/**
 *
 * AboutSetting comp
 * folder copied from BottomBar
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function AccountSetting(props) {
  const {
    dispatch,
    theme,
    user_info
  } = props;

  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Account Management
      </Typography>
    </CardContent>
  );
}

AccountSetting.propTypes = {};

export default memo(AccountSetting);
