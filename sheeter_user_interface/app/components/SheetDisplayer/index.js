/**
 *
 * SheetDisplayer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from "@material-ui/styles";
import { EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import asciimath2latex from 'asciimath-to-latex';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


// Import css
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';


// Importing plugins for editor
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createFocusPlugin from '@draft-js-plugins/focus';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createUndoPlugin from '@draft-js-plugins/undo';
import createKaTeXPlugin from 'draft-js-katex-plugin';


// Misc imports
import { WrapperEditor } from 'components/SheeterEditor/WrapperEditor';
import messages from './messages';

// Init plugins for editor
const inlineToolbarPlugin = createInlineToolbarPlugin();
const focusPlugin = createFocusPlugin();
const linkPlugin = createLinkPlugin({
  placeholder: 'http://…',
});



const decorator = composeDecorators(focusPlugin.decorator);

const { InlineToolbar } = inlineToolbarPlugin
const undoPlugin = createUndoPlugin();
const kaTeXPlugin = createKaTeXPlugin({
  katex, // the katex object or a wrapper defining render() and __parse().

  doneContent: {
    valid: 'Done',
    invalid: 'Invalid TeX',
  },

  MathInput: null, // Sett to the MathInput element to use MathInput
  removeContent: 'Remove',
  theme: {
    // CSS classes, either you define them or they come from the plugin.css import
    saveButton: '',
    removeButton: '',
    invalidButton: '',
    buttons: '',
  },
  translator: asciimath2latex,
});

const plugins = [
  createLinkifyPlugin(),
  linkPlugin,
  createMarkdownShortcutsPlugin(),
  inlineToolbarPlugin,
  focusPlugin,
  undoPlugin,
  kaTeXPlugin
];

function SheetDisplayer() {
  const theme = useTheme();
  const [hasFocus, setHasFocus] = React.useState(false);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  return (
    <WrapperEditor theme={theme} focus={hasFocus}>
      <Editor
        readOnly
        editorState={editorState}
        onFocus={() => {
          setHasFocus(true);
        }}
        onBlur={() => setHasFocus(false)}

        plugins={plugins}
      />
    </WrapperEditor>

  );
}

SheetDisplayer.propTypes = {};

export default memo(SheetDisplayer);
