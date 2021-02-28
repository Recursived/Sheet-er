import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl'

// Importing material ui components
import {
  makeStyles,
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  Tooltip,
  Grid,
} from '@material-ui/core';

// Misc imports
import messages from './messages';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabEditor(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { buttons, dispatch } = props;

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Tools for editor"
        >
          <Tab key={1} label={<FormattedMessage {...messages.classictabbuttons} />} {...a11yProps(0)} />
          <Tab key={2} label={<FormattedMessage {...messages.sciencetabbuttons} />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel key={1} value={value} index={0}>
        <Grid container spacing={2}>
          {buttons.classic_buttons.map((Button, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid xs={2}><Button key={i} /></Grid>
          ))}
        </Grid>

      </TabPanel>
      <TabPanel key={2} value={value} index={1}>
        {buttons.science_buttons.map((Button, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid xs={2}><Button key={i} /></Grid>
        ))}
      </TabPanel>
    </div>
  );
}


TabEditor.propTypes = {
  buttons: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
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
  withConnect
)(TabEditor);