/**
 *
 * SheeterEditor
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import katex from 'katex'
import { FormattedMessage, injectIntl } from 'react-intl';
import asciimath2latex from 'asciimath-to-latex';
import { createStructuredSelector } from 'reselect';
import { EditorState, RichUtils, getDefaultKeyBinding, convertToRaw } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import { useTheme } from "@material-ui/styles";
import { Chip, Tooltip, makeStyles, Grid } from '@material-ui/core';


// Import css
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import linkStyles from './linkStyles.module.css';


// Importing icons
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';

// Importing plugins for editor
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createFocusPlugin from '@draft-js-plugins/focus';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createUndoPlugin from '@draft-js-plugins/undo';
import createKaTeXPlugin from 'draft-js-katex-plugin';




// Importing actions and selectors
import {
  requestSetEditorContent,
  requestAddSheet
} from 'containers/EditingPage/actions';
import makeSelectEditingPage from 'containers/EditingPage/selectors';




// Misc import
import messages from './messages';
import { WrapperEditor } from './WrapperEditor'
import EditorMenu from 'components/EditorMenu/Loadable';
import SheeterInlineToolbar from './EditorPlugins/InlinePlugin/SheeterInlineToolbar';
import { debounce } from 'lodash';


// Init plugins for editor
const inlineToolbarPlugin = createInlineToolbarPlugin();
const focusPlugin = createFocusPlugin();
const linkPlugin = createLinkPlugin({
  placeholder: 'http://…',
  theme: linkStyles
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


function SheeterEditor(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { editing, dispatch } = props;

  const [hasFocus, setHasFocus] = React.useState(false);
  const [wasModified, setWasModified] = React.useState(false);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const getWordCount = (editorState) => {
    const plainText = editorState.getCurrentContent().getPlainText('');
    const regex = /(?:\r\n|\r|\n)/g;  // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
    const wordArray = cleanString.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  const saveContentEditor = React.useCallback(
    debounce((content) => {
      dispatch(requestSetEditorContent(content));
      setWasModified(true);
    }, 1000),
    []
  );

  React.useEffect(() => {
    console.log(wasModified);
    if (editing.editor_content_sheet !== null &&
      editing.title_sheet !== null &&
      editing.locale_sheet !== null &&
      editing.type_sheet !== null &&
      (editing.tags_sheet !== null && editing.tags_sheet.length > 0) &&
      wasModified
    ) {
      // When every fields are complete
      dispatch(requestAddSheet());
      setWasModified(false);
    }
  }, [wasModified])

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
                onFocus={() => {
                  setHasFocus(true);
                }}
                onBlur={() => setHasFocus(false)}
                onChange={(newState) => {
                  if (editorState.getCurrentContent() !== newState.getCurrentContent()){
                    saveContentEditor(convertToRaw(newState.getCurrentContent()));
                  }
                  setEditorState(newState);
                }}
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
            <SheeterInlineToolbar
              toolbar={InlineToolbar}
              buttons={{
                "link_button": linkPlugin.LinkButton,
              }}
            />

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
        <EditorMenu buttons={{
          "classic_buttons": [
            undoPlugin.UndoButton,
            undoPlugin.RedoButton,
          ],

          "science_buttons": [
            kaTeXPlugin.InsertButton
          ]
        }} />
      </Grid>
    </Grid>



  );
}

SheeterEditor.propTypes = {
  editing: PropTypes.object.isRequired
};


const mapStateToProps = createStructuredSelector({
  editing: makeSelectEditingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(SheeterEditor);
