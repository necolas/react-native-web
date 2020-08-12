/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { useRef, useEffect } from 'react';

import Text from '../Text';
import StyleSheet from '../StyleSheet';

/**
 * This Component is used to "wrap" the modal we're opening
 * so that changing focus via tab will never leave the document.
 *
 * This allows us to properly trap the focus within a modal
 * even if the modal is at the start or end of a document.
 */

const FocusBracket = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.setNativeProps({
        tabIndex: 0
      });
    }
  }, [ref]);

  return <Text ref={ref} style={[styles.focusBracket]} />;
};

export default FocusBracket;

const styles = StyleSheet.create({
  focusBracket: {
    outline: 'none'
  }
});
