/**
 *
 * AboutSetting comp
 * folder copied from BottomBar
 *
 */

import React, { memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Misc imports
import LocaleSelector from 'components/LocaleSelector';

function LanguageSetting() {
  
  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Select your Language
      </Typography>
      <LocaleSelector/>
    </CardContent>
  );
}

LanguageSetting.propTypes = {};

export default memo(LanguageSetting);
