/**
 *
 * FilterSheetType
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { FormattedMessage } from 'react-intl';

// Importing icons
import CircularProgress from '@material-ui/core/CircularProgress';

// Importing actions and selectors
import makeSelectProfilePage from 'containers/ProfilePage/selectors';
import {
  requestGetSheetType,
  requestSetType
} from 'containers/ProfilePage/actions';

// Misc imports
import messages from './messages';

function FilterSheetType(props) {
  const { profilepage, dispatch } = props;
  const options =  profilepage.type_list.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  const [open, setOpen] = React.useState(false);
  const [typeValue, setTypeValue] = React.useState(null);
  const loading = open && profilepage.type_list.length === 0;

  return (
    <Autocomplete
      value={typeValue}
      onOpen={() => {
        setOpen(true);
        dispatch(requestGetSheetType());
      }}
      onClose={() => setOpen(false)}
      open={open}
      onChange={(_, value) => {
        setTypeValue(value)
        dispatch(requestSetType(value));
      }}
      loading={loading}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      autoHighlight
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      filterOptions={createFilterOptions({
        matchFrom: 'start'
      })}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.label}
      noOptionsText={<FormattedMessage {...messages.nooptionslabel} />}
      loadingText={<FormattedMessage {...messages.loadinglabel} />}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          label={<FormattedMessage {...messages.labelsheettype} />}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}


    />
  )
}

FilterSheetType.propTypes = {
  profilepage: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage()
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
)(FilterSheetType);
