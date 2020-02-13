import { createGlobalStyle } from 'styled-components';
import { checkPropTypes } from 'prop-types';
import { useTheme } from '@material-ui/core/styles';


export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.palette.background.default};
    color: ${props => props.theme.palette.text.primary };
  }`