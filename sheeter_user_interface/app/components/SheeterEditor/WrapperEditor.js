import styled from 'styled-components';


export const WrapperEditor = styled.div`
    background-color: ${props => props.theme.palette.background.paper}; 
    box-shadow: ${props => props.theme.shadows[15]};
    border: ${props => props.focus ? "2px" : "1px"} solid ${props => props.theme.palette.primary.main};
    min-height: 50vh;
    cursor: text;

    & > .DraftEditor-root  {
        min-height: inherit !important;
    }

    & > * > .DraftEditor-editorContainer {
        min-height: inherit !important;
    }
    
    & > * > * > .public-DraftEditor-content {
        min-height: inherit !important;
        padding: ${props => props.theme.spacing(1)}px;
    }
`