/**
 *
 * EditingPage
 *
 */

import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import EditorMenu from 'components/EditorMenu/Loadable';

const useStyles = makeStyles(theme => ({
  boxcontainer: {
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      
    }
  },

  gridcontainer: {
    minHeight: '100vh',

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10)
    }
  }

  

}));
export function EditingPage() {
  const classes = useStyles();


  useInjectReducer({ key: 'editingPage', reducer });
  useInjectSaga({ key: 'editingPage', saga });

  return (
    <Box className={classes.boxcontainer}>
      <Helmet>
        <title>EditingPage</title>
        <meta name="description" content="Description of EditingPage" />
      </Helmet>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.gridcontainer}
      >
        <Grid container spacing={3}>
          <Grid xs={12} sm={9} item>
            <SheeterEditor />
          </Grid>
       
        <Grid xs={12} sm={3} item>
          <EditorMenu/>
        </Grid>
        </Grid>

      </Grid>
    </Box>


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
