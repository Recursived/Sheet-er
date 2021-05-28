/**
 *
 * MainSearchbar
 *
 */

import { TextField } from '@material-ui/core';
import { debounce } from 'lodash';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';


// Action && selectors import
import { requestGetSheetList } from 'containers/HomePage/actions';
import makeSelectHomePage from 'containers/HomePage/selectors';

// Misc imports 
import messages from './messages';

function MainSearchbar(props) {

  const { dispatch, homepage } = props;
  // const [value, setValue] = React.useState(homepage.searchfilter);

  const getSearch = React.useCallback(
    debounce((title) => {
      dispatch(requestGetSheetList(title));
    }, 500),
    []
  );

  return (
    <TextField
      defaultValue={homepage.searchfilter}
      fullWidth
      variant="filled"
      color="primary"
      label={<FormattedMessage {...messages.searchlabel} />}
      onChange={(event) => {
        getSearch(event.target.value);
      }}
    />
  );
}

MainSearchbar.propTypes = {
  homepage: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
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
)(MainSearchbar);

