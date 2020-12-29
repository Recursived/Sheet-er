/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { useTheme } from "@material-ui/styles";
import { Chip } from '@material-ui/core';
import 'draft-js/dist/Draft.css';

// Importing plugins for editor
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';

// Misc import
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { WrapperEditor } from './WrapperEditor'


const plugins = [
  createMarkdownShortcutsPlugin(),
];


function SheeterEditor() {
  const theme = useTheme();
  const [hasFocus, setHasFocus] = React.useState(false);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const getWordCount = (editorState) => {
    const plainText = editorState.getCurrentContent().getPlainText('');
    const regex = /(?:\r\n|\r|\n)/g;  // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
    const wordArray = cleanString.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }


  console.log(getWordCount(editorState));

  return (
    <div>
      <WrapperEditor theme={theme} focus={hasFocus}>
        <Editor
          editorState={editorState}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          onChange={(newState) => setEditorState(newState)}
          plugins={plugins}
        />

      </WrapperEditor>
      <div>

      </div>
      <Chip
        color="primary"
        label={
          <FormattedMessage
            {...messages.word}
            values={{
              counter: getWordCount(editorState),
            }}
          />
        }
      />
    </div>


  );
}

SheeterEditor.propTypes = {};

export default memo(SheeterEditor);
