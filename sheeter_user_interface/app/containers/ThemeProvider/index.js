/**
 *
 * ThemeProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components'
import { makeSelectThemeProvider } from './selectors';

// We create a global style object to change aspect according to the theme
const GlobalTheme = createGlobalStyle`
  html  {
    background : ${props => props.theme.palette.background.default}
  }
`

export function ThemeProvider(props) {
  return (
    <MuiThemeProvider theme={props.theme}>
      <GlobalTheme theme={props.theme}/>
      {React.Children.only(props.children)}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectThemeProvider(),
  theme => ({theme})
);


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeProvider);