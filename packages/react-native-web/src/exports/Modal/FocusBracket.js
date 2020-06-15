import React from 'react';

import Text from '../Text';
import StyleSheet from '../StyleSheet';

// This is used to wrap "wrap" the dialog we're opening so that
// when you're tab focusing you'll never leave the document and
// we still trap the focus even if the dialog is at the start
// or end of the document.
export default class FocusBracket extends React.PureComponent<> {
  ref = React.createRef();

  componentDidMount() {
    const { current } = this.ref;
    if (!current) {
      return;
    }

    current.setNativeProps({
      tabIndex: 0
    });
  }

  render() {
    return <Text ref={this.ref} style={[styles.focusBracket]} />;
  }
}

const styles = StyleSheet.create({
  focusBracket: {
    outline: 'none'
  }
});
