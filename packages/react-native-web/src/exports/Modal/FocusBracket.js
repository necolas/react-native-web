/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';

import Text from '../Text';
import StyleSheet from '../StyleSheet';

/**
 * This Component is used to "wrap" the modal we're opening
 * so that changing focus via tab will never leave the document.
 *
 * This allowsus to properly trap the focus within a modal
 * even if the modal is at the start or end of a document.
 */
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
