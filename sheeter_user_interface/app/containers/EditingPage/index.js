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
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEditingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


// Importing actions and selectors
import {
  requestAddSheet
} from 'containers/EditingPage/actions';

// Importing components
import SheeterEditor from 'components/SheeterEditor/Loadable';

// Misc imports
import { checkSheetComplete } from 'utils/utils';


const useStyles = makeStyles(theme => ({
  boxcontainer: {
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),

    }
  },

  gridcontainer: {
    minHeight: '100vh',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-1)
    }
  },

  gridMargin: {
    marginTop: '70px'
  },

  totalWidth: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px!important'
    }
  }



}));

export function EditingPage(props) {
  const classes = useStyles();
  const intl = props.intl;
  const {dispatch, editing } = props;

  // useInjectReducer({ key: 'editingPage', reducer });
  useInjectSaga({ key: 'editingPage', saga });

  // Si un elem est modifié est que la fiche est complète, on save automatiquement
  React.useEffect(() => {
    if (checkSheetComplete(editing) && editing.sheet_modified) {
      dispatch(requestAddSheet());
    }

  }, [editing]);

  return (
    <Box className={classes.boxcontainer}>
      <Helmet>
        <title>{intl.formatMessage(messages.editingroute)}</title>
      </Helmet>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.gridcontainer}
      >
        <Grid className={classes.gridMargin} container spacing={3}>
          <Grid className={classes.totalWidth} item>
            <SheeterEditor />
          </Grid>
        </Grid>
      </Grid>
    </Box>


  );
}

EditingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  editing: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  editing: makeSelectEditingPage(),
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
  injectIntl
)(EditingPage);
