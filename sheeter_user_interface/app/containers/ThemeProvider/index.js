/**
 *
 * ThemeProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';
import { makeSelectThemeProvider } from './selectors';

// We create a global style object to change aspect according to the theme
const GlobalTheme = createGlobalStyle`
  html,body {
    height: 100%;
    width: 100%;
    background : ${props => props.theme.palette.background.default}
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background : ${props => props.theme.palette.background.default}
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export function ThemeProvider(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#69b488'
      },
      secondary: {
        main: '#c8e6c9',
      },
      type: props.themeColor,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalTheme theme={theme} />
      {React.Children.only(props.children)}
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = makeSelectThemeProvider();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeProvider);
