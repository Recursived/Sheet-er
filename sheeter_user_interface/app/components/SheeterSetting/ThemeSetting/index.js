/**
 *
 * ThemeSetting comp
 * folder copied from BottomBar
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { changeTheme } from 'containers/ThemeProvider/actions';


function ThemeSetting(props) {
  const {
    dispatch,
    theme,
    user_info
  } = props;
  
  const [state, setState] = React.useState({
    checkedDarkMode: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log("checkedDarkMode :", state.checkedDarkMode);
    dispatch(changeTheme(state.checkedDarkMode ? 'light' : 'dark'));
 };

  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Theme Management
      </Typography>
      <Typography variant="h6">
        Toggle Dark Mode
      </Typography>
      <Switch
        checked={state.checkedDarkMode}
        onChange={handleChange}
        color="primary"
        name="checkedDarkMode"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </CardContent>
  );
}

ThemeSetting.propTypes = {};

export default memo(ThemeSetting);
