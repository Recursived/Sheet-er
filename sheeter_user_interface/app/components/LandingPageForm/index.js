/**
 *
 * LandingPageForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import {Paper, Grid, TextField, makeStyles, AppBar, Tabs, Tab,withStyles,Box} from '@material-ui/core';
import messages from './messages';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const styles = makeStyles(themes => ({
  paper : {
    width:"400px",
    float:"right",
    marginTop:"300px",
    marginRight:"200px",
    [themes.breakpoints.down('sm')]:{
      marginLeft:"auto",
      marginRight:"auto"
    }
  },
  
}));

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

function LandingPageForm() {
  const classes = styles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Grid className={classes.form}>
        
      <Paper elevation={20} className={classes.paper}>
      <AppBar position="static">
          <StyledTabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <StyledTab label={<FormattedMessage {...messages.signin} />}/>
            <StyledTab label={<FormattedMessage {...messages.signup} />}  />
          </StyledTabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <Grid xs={6}>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  id=""
                  label={<FormattedMessage {...messages.name}/>}
                  type="text"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id=""
                  label={<FormattedMessage {...messages.firstname}/>}
                  type="text"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Grid item sm={10}>
              <TextField
                id=""
                label={<FormattedMessage {...messages.email}/>}
                type="text"
                autoComplete="current-password"
                fullWidth
              />
            </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
            
          </Paper>
      </Grid>
      
    </div>
  );
}

LandingPageForm.propTypes = {};

export default LandingPageForm;
