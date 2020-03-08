/**
 *
 * LandingPageForm
 *
 */

import { makeStyles, Paper, Tab, Tabs, AppBar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import TabPanel from './TabPanel';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
});

function LandingPageForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<ExitToAppIcon />} label="RECENTS" />
          <Tab icon={<PersonAddIcon />} label="FAVORITES" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Paper>
  );
}

LandingPageForm.propTypes = {};

export default LandingPageForm;
