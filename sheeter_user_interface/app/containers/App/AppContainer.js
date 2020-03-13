import styled from 'styled-components';

const AppContainer = styled.div`
  background: ${props => props.theme.palette.background.default};
  color: ${props => props.theme.palette.text.primary};
`;

export default AppContainer;
