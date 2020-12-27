/**
 *
 * EditingPage
 *
 */

import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from "@material-ui/styles";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEditingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// Importing components
import SheeterEditor from 'components/SheeterEditor/Loadable';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "200px"
  }
}));
export function EditingPage() {
  const classes = useStyles();
  const theme = useTheme();
  
  useInjectReducer({ key: 'editingPage', reducer });
  useInjectSaga({ key: 'editingPage', saga });

  return (
    <Container className={classes.container}>
      <Helmet>
        <title>EditingPage</title>
        <meta name="description" content="Description of EditingPage" />
      </Helmet>
      <SheeterEditor />
    </Container>


  );
}

EditingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editingPage: makeSelectEditingPage(),
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

export default compose(withConnect)(EditingPage);
