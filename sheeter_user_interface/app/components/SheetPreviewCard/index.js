/**
 *
 * SheetPreviewCard
 *
 */

import React, { memo } from 'react';
import clsx from 'clsx';
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

// Icon imports
import GradeIcon from '@material-ui/icons/Grade';

// Misc imports
import messages from './messages';
import {
  countryToFlag,
  codeToLocale
} from 'utils/utils';

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },

  clickable: {
    cursor: "pointer",
  },

  selected: {
    borderColor: `${theme.palette.primary.main}`,
    borderWidth: '5px'
  },
}));

function SheetPreviewCard(props) {
  const classes = useStyles();
  const { sheetId, clickHandler, data, variant, context } = props;
  const [noWrap, setNoWrap] = React.useState(true);
  let className = null;
  switch (variant) {
    case "link":
      className = classes.clickable;
      if (context !== null && context.link_id_sheet === sheetId) {
        className = clsx(classes.clickable, classes.selected);
      }

      break;
    case "homepage":
      className = classes.clickable;
      break;
    case "profile":
      className = classes.clickable;
      break;
  }

  return (
    <Card
      onMouseEnter={() => setNoWrap(false)}
      onMouseLeave={() => setNoWrap(true)}
      id={sheetId}
      className={className}
      variant="outlined"
      onClick={clickHandler}
    >
      <CardContent>
        <Typography variant="h5" component="h2" noWrap={noWrap}>

          {countryToFlag(codeToLocale[data.locale])}
          <span className={classes.bullet}>•</span>
          {data.title}

        </Typography>
        <Divider variant="fullWidth" />
        <Typography color="textSecondary">
          {data.subject.label}
        </Typography>
        <Typography variant="body2" component="p" noWrap={noWrap}>
          {data.descr}
        </Typography>
      </CardContent>
    </Card>
  );
}

SheetPreviewCard.propTypes = {
  sheetId: PropTypes.number.isRequired, // Correspond à l'ID de la sheet
  clickHandler: PropTypes.func.isRequired, // Function handler de click
  data: PropTypes.object.isRequired, // Données d'affichage pour la fiche
  variant: PropTypes.oneOf(['link', 'homepage', 'profile']).isRequired, // Permet de distinguer le type de preview
  context: PropTypes.object, // Correspond au context du store
};


export default memo(SheetPreviewCard);
