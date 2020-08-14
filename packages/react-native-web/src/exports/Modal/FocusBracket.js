/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import createElement from '../createElement';
import StyleSheet from '../StyleSheet';

/**
 * This Component is used to "wrap" the modal we're opening
 * so that changing focus via tab will never leave the document.
 *
 * This allows us to properly trap the focus within a modal
 * even if the modal is at the start or end of a document.
 */

const FocusBracket = () => {
  return createElement(
    'div',
    {
      style: styles.focusBracket,
      accessibilityRole: 'none',
      focusable: true,
      tabIndex: 0
    }
  );
};

export default FocusBracket;

const styles = StyleSheet.create({
  focusBracket: {
    visibility: 'none',
    outline: 'none'
  }
});
