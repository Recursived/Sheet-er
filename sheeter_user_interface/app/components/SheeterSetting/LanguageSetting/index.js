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

import { changeTheme } from 'containers/ThemeProvider/actions';

function LanguageSetting(props) {
  const {
    dispatch,
    theme,
    user_info
  } = props;
  
  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Select your Language
      </Typography>
    </CardContent>
  );
}

LanguageSetting.propTypes = {};

export default memo(LanguageSetting);
