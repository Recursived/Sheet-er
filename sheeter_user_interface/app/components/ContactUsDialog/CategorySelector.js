/**
 *
 * ContactUsDialog
 *
 */

import { 
  Divider,
  FormControl, 
  InputLabel, 
  ListSubheader, 
  makeStyles, 
  MenuItem, 
  Select
} from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';


// Importing icons
import CloseIcon from '@material-ui/icons/Close';

// Importing actions and selectors
import { makeSelectCategories } from 'containers/App/selectors';
import {
  isRequestCategoriesAction
} from 'containers/App/actions';

// Misc imports
import messages from './messages';




const useStyle = makeStyles((theme) => ({
  select: {
    width: '100%'
  },


}));

function CategorySelector(props) {
  const classes = useStyle();
  const { 
    value,
    categories, 
    handler,
    dispatch,
   } = props;

  React.useEffect(() => {
    if (categories === null || categories.length == 0){
      dispatch(isRequestCategoriesAction());
    }
  }, []);


  const subheader = categories
    .filter(item => item.parent === null);
  
  const group = [];
  for (let i = 0; i < subheader.length; i++){
    group.push(
      <ListSubheader key={subheader[i].id}>
          {subheader[i].title}
      </ListSubheader>
    );
    
    const list_items = categories.filter(item => item.parent === subheader[i].id);
    for (let j = 0; j < list_items.length; j++){
      group.push(
        <MenuItem 
          key={list_items[j].id}
          value={list_items[j].id}
        >
          {list_items[j].title}
        </MenuItem>
      );
    }
    group.push(<Divider component="li" />)
  }
  // We remove last divider
  group.pop();

  return (
    <FormControl variant="outlined" className={classes.select}>
      <InputLabel id="simple-select-outlined-label"> <FormattedMessage {...messages.labelselector} /> </InputLabel>
      <Select
        labelId="simple-select-outlined-label"
        id="simple-select-outlined"
        value={value}
        onChange={handler}
        label={<FormattedMessage {...messages.labelselector} />}
      >
        {group}
      </Select>
    </FormControl>
  );
}

CategorySelector.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories()
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
