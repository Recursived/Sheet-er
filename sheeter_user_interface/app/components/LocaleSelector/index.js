/**
 *
 * LocaleSelector
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import messages from './messages';
import { appLocales } from 'i18n';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';

// Import actions
import { changeLocale } from 'containers/LanguageProvider/actions';

// Import Selectors
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function LocaleSelector(props) {
  const classes = useStyles();
  let options = [];
  if (appLocales){
    options = appLocales.map(value => (
      <MenuItem value={value}>{value}</MenuItem>
    ));
  }
  
  const [open, setOpen] = React.useState(false);

  const autoClose = () => {
      setOpen(true);
      setTimeout(() => setOpen(false), 2000)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="locale-selector-label-1-id">
          <FormattedMessage {...messages.header} />
        </InputLabel>
        <Tooltip open={open} onMouseEnter={autoClose} title={<FormattedMessage {...messages.tooltip} />} placement="right" arrow>
          <Select
            labelId="locale-selector-label-1-id"
            id="locale-selector-1-id"
            value={props.locale}
            onChange={props.onLocaleToggle}
          >
            {options}
          </Select>
        </Tooltip>
      </FormControl>
    </div>
  );
}

// Enforce type checking on the props
LocaleSelector.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

// Connect the state of the redux store to the component
const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

// Connect the dispatch function and the reducer to the component
function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

// We actually connect the elements here
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleSelector);
