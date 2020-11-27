/**
 *
 * ContactUsDialog
 *
 */

import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';


// Importing icons
import CloseIcon from '@material-ui/icons/Close';

// Importing actions and selectors
import { makeSelectContactDialog } from 'containers/App/selectors';
import { 
  closeContactDialogAction,
  openContactDialogAction
} from 'containers/App/actions';

// Misc imports
import messages from './messages';




const useStyle = makeStyles((theme) => ({
  select: {
    width: '100%'
  }
}));

function CategorySelector(props) {
  const classes = useStyle();


  return (
    <FormControl variant="outlined" className={classes.select}>
    <InputLabel id="demo-simple-select-outlined-label"> <FormattedMessage {...messages.labelselector}/> </InputLabel>
    <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value=""
        label={<FormattedMessage {...messages.labelselector}/>}
    >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    </FormControl>
  );
}

CategorySelector.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  contactDialog: makeSelectContactDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo
)(CategorySelector);
