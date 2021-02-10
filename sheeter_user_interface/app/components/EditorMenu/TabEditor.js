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
          <Typography>{children}</Typography>
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

  const handleChange = (event, newValue) => {
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
          <Tab label={<FormattedMessage {...messages.classictabbuttons}/>} {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {buttons.classic_buttons.map((Button, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid xs={2}><Button key={i} /></Grid>
          ))}
        </Grid>

      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
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