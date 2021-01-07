/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { useTheme } from "@material-ui/styles";
import { Chip, Tooltip, makeStyles, Grid } from '@material-ui/core';
import 'draft-js/dist/Draft.css';

// Importing icons
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';

// Importing plugins for editor
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

// Misc import
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { WrapperEditor } from './WrapperEditor'

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin

const plugins = [
  createMarkdownShortcutsPlugin(),
  inlineToolbarPlugin
];

const useStyles = makeStyles(theme => ({

  warningchip: {
    backgroundColor: theme.palette.type == "dark" ?
      theme.palette.warning.dark :
      theme.palette.warning.dark,
    color: theme.palette.type == "dark" ?
      theme.palette.getContrastText(theme.palette.warning.dark) :
      theme.palette.getContrastText(theme.palette.warning.dark),
  },

  chipicon: {
    color: theme.palette.type == "dark" ?
      theme.palette.getContrastText(theme.palette.warning.dark) :
      theme.palette.getContrastText(theme.palette.warning.dark),
  }
}));


function SheeterEditor() {
  const classes = useStyles();
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


  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item>
        <WrapperEditor theme={theme} focus={hasFocus}>
          <Editor
            editorState={editorState}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            onChange={(newState) => setEditorState(newState)}
            plugins={plugins}
          />
        </WrapperEditor>
        <InlineToolbar/>
      </Grid>
      <Grid item>
        {getWordCount(editorState) < 500 ? (
          <Chip
            icon={<CheckIcon className={classes.chipicon} />}
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
        ) : (
            <Tooltip title={<FormattedMessage {...messages.toomanywords} />}>
              <Chip
                icon={<WarningIcon className={classes.chipicon} />}
                className={classes.warningchip}
                label={
                  <FormattedMessage
                    {...messages.word}
                    values={{
                      counter: getWordCount(editorState),
                    }}
                  />
                }
              />
            </Tooltip>
          )}
      </Grid>
    </Grid>


  );
}

SheeterEditor.propTypes = {};

export default memo(SheeterEditor);
