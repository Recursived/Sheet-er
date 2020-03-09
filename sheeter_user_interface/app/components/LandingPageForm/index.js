/**
 *
 * LandingPageForm
 *
 */

import { makeStyles, Paper, Tab, Tabs, AppBar , TextField} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import TabPanel from './TabPanel';
import messages from './messages';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  tabpanel: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(3),
    },
  }
}));

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
          <Tab icon={<ExitToAppIcon />} label={<FormattedMessage {...messages.signup} />} />
        <Tab icon={<PersonAddIcon />} label={<FormattedMessage {...messages.signin} />} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabpanel} value={value} index={0}>
        <TextField fullWidth id="filled-basic" label="Filled" variant="filled" />
        <TextField m={3} fullWidth id="filled-basic" label="Filled" variant="filled" />
        <TextField fullWidth id="filled-basic" label="Filled" variant="filled" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Paper>
  );
}

LandingPageForm.propTypes = {};

export default LandingPageForm;
