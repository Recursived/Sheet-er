/**
 *
 * SheetPreviewCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  countryToFlag,
  codeToLocale
} from 'utils/utils';

const useStyles = makeStyles({

});

function SheetPreviewCard(props) {
  const { sheetId, clickHanlder, onClickLabelButton, data } = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography  color="textSecondary">
          {countryToFlag(codeToLocale[data.locale])}
          <span>•</span>
          {data.subject.label}
        </Typography>
        <Typography variant="body2" component="p">
          {data.descr}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={clickHanlder}>{onClickLabelButton}</Button>
      </CardActions>
    </Card>
  );
}

SheetPreviewCard.propTypes = {
  sheetId: PropTypes.number.isRequired,
  clickHanlder: PropTypes.func.isRequired,
  onClickLabelButton: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
  // Un prop correspondant à l'id de la fiche
  // un prop qui est une fonction que l'on donne au OnClick
  // Un prob obj correspondant aux datas de l'objet
};

export default memo(SheetPreviewCard);
