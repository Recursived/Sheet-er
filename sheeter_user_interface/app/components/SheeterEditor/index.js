/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SheeterEditor() {
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

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
    >
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
      />
    </div>

  );
}

SheeterEditor.propTypes = {};

export default memo(SheeterEditor);
