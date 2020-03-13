/**
 *
 * LandingPageForm
 *
 */

import {
  makeStyles,
  Paper,
  Tab,
  Tabs,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import TabPanel from './TabPanel';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  tabpanel: {
    '& .MuiTextField-root , & .MuiButton-root': {
      marginBottom: theme.spacing(3),
    },
  },
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
          <Tab
            icon={<ExitToAppIcon />}
            label={<FormattedMessage {...messages.signup} />}
          />
          <Tab
            icon={<PersonAddIcon />}
            label={<FormattedMessage {...messages.signin} />}
          />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabpanel} value={value} index={0}>
        <TextField
          fullWidth
          id="filled-email"
          label={<FormattedMessage {...messages.email} />}
          variant="filled"
        />
        <TextField
          fullWidth
          id="filled-name"
          label={<FormattedMessage {...messages.name} />}
          variant="filled"
        />
        <TextField
          fullWidth
          id="filled-firstname"
          label={<FormattedMessage {...messages.firstname} />}
          variant="filled"
        />
        <Button fullWidth variant="contained" color="secondary">
          <FormattedMessage {...messages.googlesignup} />
        </Button>
        <Button fullWidth variant="contained" color="secondary">
          <FormattedMessage {...messages.facebooksignup} />
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Paper>
  );
}

LandingPageForm.propTypes = {};

export default LandingPageForm;
