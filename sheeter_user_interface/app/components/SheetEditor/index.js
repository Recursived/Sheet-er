/**
 *
 * SheetEditor
 *
 */

import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Immutable from "immutable";

import './sheeteditor.css';

function SheetEditor() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
    }

    return (<
        Editor editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
    />);
}


SheetEditor.propTypes = {};

export default SheetEditor;

