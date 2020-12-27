/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import 'draft-js/dist/Draft.css';
// import PropTypes from 'prop-types';

// Importing plugins for editor
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


const plugins = [createMarkdownShortcutsPlugin()];

// class SheeterEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//   }

//   onChange = editorState => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     return <Editor editorState={this.state.editorState} onChange={this.onChange} plugins={plugins} />;
//   }
// }



function SheeterEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );


  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
    >
      <Editor
        editorState={editorState}
        onChange={(newState) => setEditorState(newState)}
        plugins={plugins}
      />
    </div>

  );
}

SheeterEditor.propTypes = {};

export default memo(SheeterEditor);
