import React, { Component } from 'react';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  AlignBlockCenterButton,
  AlignBlockLeftButton,
  AlignBlockDefaultButton,
  AlignBlockRightButton
} from '@draft-js-plugins/buttons';
import { Separator } from '@draft-js-plugins/inline-toolbar';


class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = (event) => event.preventDefault();

  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
      >
        <button onClick={this.onClick} >
          H
        </button>
      </div>
    );
  }
}

class AlignmentPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [
      AlignBlockDefaultButton,
      AlignBlockLeftButton,
      AlignBlockCenterButton,
      AlignBlockRightButton,
    ];
    return (
      <div>
        {buttons.map((Button, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class AlignmentButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = (event) => event.preventDefault();

  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(AlignmentPicker);

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
      >
        <button onClick={this.onClick} >
          A
        </button>
      </div>
    );
  }
}


class SheeterInlineToolbar extends Component {


  render() {
    const InlineToolbar = this.props.toolbar;
    const imported_buttons = this.props.buttons;
    

    const buttons = [
      BoldButton,
      ItalicButton,
      UnderlineButton,
      CodeButton,
      imported_buttons["link_button"],
      Separator,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton,
      // HeadlinesButton,
    ]
    return (
      <InlineToolbar>
        {
          // may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (

            <React.Fragment>
              {buttons.map((Button, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Button key={i} {...externalProps} />
              ))}
            </React.Fragment>
          )
        }
      </InlineToolbar>
    )
  }

}


export default SheeterInlineToolbar;