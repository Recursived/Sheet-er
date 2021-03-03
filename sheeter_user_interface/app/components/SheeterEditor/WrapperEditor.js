import styled from 'styled-components';


export const WrapperEditor = styled.div`
    background-color: ${props => props.theme.palette.background.paper}; 
    box-shadow: ${props => props.theme.shadows[5]};
    border: 2px solid ${props => !props.focus ? props.theme.palette.grey[400] : props.theme.palette.primary.main };
    border-radius: ${props => props.theme.shape.borderRadius}px;
    min-height: 75vh;
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