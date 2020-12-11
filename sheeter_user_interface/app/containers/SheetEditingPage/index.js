/**
 *
 * SheetEditingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSheetEditingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles } from '@material-ui/core/styles';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
// import SheetEditor from 'components/SheetEditor';

import './sheeteditor.css';

const useStyles = makeStyles({
  base: {
    paddingTop: '8vh',
    paddingBot: '1%',
    paddingRight: '1%',
    paddingLeft: '1%',
  },
  SheetEditor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ToolBar: {
    width: '30%',
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
    backgroundColor: '#727272',
    borderRadius: '0.5em',
    border: '1px solid rgb(0, 0, 0)',
    padding: '0.5em',
  },
  StyleButton: { width: '3em', textAlign: 'center', backgroundColor: 'rgb(86, 146, 111)', },
  Underline: { textDecoration: 'underline', width: '3em', textAlign: 'center', backgroundColor: 'rgb(86, 146, 111)'},
  StrikeThrough: { textDecoration: 'line-through', fontSize: '1em', width: '3em', textAlign: 'center', backgroundColor: 'rgb(86, 146, 111)'}
});

export function SheetEditingPage() {
  const classes = useStyles();

  useInjectReducer({ key: 'sheetEditingPage', reducer });
  useInjectSaga({ key: 'sheetEditingPage', saga });

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

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  const onStrikeThroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"))
  };

  return (
    <div className={classes.base}>
      <Helmet>
        <title>Sheet Editing Page</title>
        <meta name="description" content="Description of SheetEditingPage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <h3>Here you can create your Sheet.</h3>
      <div className={classes.SheetEditor}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState} />
        <div className={classes.ToolBar}>
          <button className={classes.Underline} onClick={onUnderlineClick}>U</button>
          <button className={classes.StyleButton} onClick={onBoldClick}><b>B</b></button>
          <button className={classes.StyleButton} onClick={onItalicClick}><em>I</em></button>
          <button className={classes.StrikeThrough} onClick={onStrikeThroughClick}>abc</button>
        </div>
      </div>
    </div>
  );
}

SheetEditingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sheetEditingPage: makeSelectSheetEditingPage(),
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

export default compose(withConnect)(SheetEditingPage);
