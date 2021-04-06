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
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core'

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  countryToFlag,
  codeToLocale
} from 'utils/utils';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 3px',
    transform: 'scale(0.8)',
  },
});

function SheetPreviewCard(props) {
  const classes = useStyles();
  const { sheetId, clickHandler, data } = props;

  return (
    <Card id={sheetId} variant="outlined" onClick={clickHandler}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.title}
          <span className={classes.bullet}>•</span>
          {countryToFlag(codeToLocale[data.locale])}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography color="textSecondary">
          {data.subject.label}
        </Typography>
        <Typography variant="body2" component="p">
          {data.descr}
        </Typography>
      </CardContent>
    </Card>
  );
}

SheetPreviewCard.propTypes = {
  sheetId: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
  // Un prop correspondant à l'id de la fiche
  // un prop qui est une fonction que l'on donne au OnClick
  // Un prob obj correspondant aux datas de l'objet
};

export default memo(SheetPreviewCard);
