/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
import { EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import { useTheme } from "@material-ui/styles";
import { Chip, Tooltip, makeStyles, Grid } from '@material-ui/core';

// Import css
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/divider/lib/plugin.css';

// Importing icons
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';

// Importing plugins for editor
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createFocusPlugin from '@draft-js-plugins/focus';
import createDividerPlugin from '@draft-js-plugins/divider';
 


import SheeterInlineToolbar from './EditorPlugins/InlinePlugin/SheeterInlineToolbar';

// Misc import
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { WrapperEditor } from './WrapperEditor'
import EditorMenu from 'components/EditorMenu/Loadable';


// Init plugins for editor


const inlineToolbarPlugin = createInlineToolbarPlugin();
const focusPlugin = createFocusPlugin();

const decorator = composeDecorators(focusPlugin.decorator);

const { InlineToolbar } = inlineToolbarPlugin
const dividerPlugin = createDividerPlugin({ decorator });
const { DividerButton } = dividerPlugin;

const plugins = [
  createLinkifyPlugin(),
  createMarkdownShortcutsPlugin(),
  inlineToolbarPlugin,
  focusPlugin,
  dividerPlugin
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
  },

  container: {
    margin: 0
  },

  gridEditor: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }

}));


// Problème lorsque l'on réduit l'écran --> scrollbar horizontale


function SheeterEditor() {
  const classes = useStyles();
  const theme = useTheme();
  let editor = null;

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
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      className={classes.container}
      spacing={5}
    >
      <Grid className={classes.gridEditor} sm={12} md={8} item>
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
                ref={(elem) => {
                  editor = elem;
                }}
                onFocus={() => {
                  setHasFocus(true);
                  editor.focus();
                }}
                onBlur={() => setHasFocus(false)}
                onChange={(newState) => setEditorState(newState)}
                handleKeyCommand={(command, editorState) => {
                  const newState = RichUtils.handleKeyCommand(editorState, command);

                  if (newState) {
                    setEditorState(newState);
                    return 'handled';
                  }

                  return 'not-handled';
                }}
                keyBindingFn={(e) => {
                  return getDefaultKeyBinding(e)
                }}
                plugins={plugins}
              />
            </WrapperEditor>
            <SheeterInlineToolbar toolbar={InlineToolbar} />

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
      </Grid>

      <Grid className={classes.gridEditor} sm={12} md={4} item>
        <EditorMenu />
      </Grid>
    </Grid>



  );
}

SheeterEditor.propTypes = {};

export default memo(SheeterEditor);
