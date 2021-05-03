/**
 *
 * ThemeSetting comp
 * folder copied from BottomBar
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  CardContent,
  Switch,
  Typography
} from '@material-ui/core'
import { useTheme } from "@material-ui/styles";
import { createStructuredSelector } from 'reselect';

import { changeTheme } from 'providers/ThemeProvider/actions';


function ThemeSetting(props) {
  const { dispatch } = props;

  const theme = useTheme();
  const [isDark, setIsDark] = React.useState(theme.palette.type == "dark");

  const handleChange = () => {
    setIsDark(!isDark);
    dispatch(changeTheme(isDark ? 'light' : 'dark'));
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
        checked={isDark}
        onChange={handleChange}
        color="primary"
        name="checkedDarkMode"
        inputProps={{ 'aria-label': 'theme checkbox' }}
      />
    </CardContent>
  );
}

ThemeSetting.propTypes = {};

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
  withConnect,
)(ThemeSetting);
