/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { Component } from 'react';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import TextAncestor from '../TextAncestor';
import TextPropTypes from './TextPropTypes';

class Text extends Component<*> {
  static displayName = 'Text';

  static propTypes = TextPropTypes;

  renderInner(isInAParentText) {
    const {
      dir,
      numberOfLines,
      onPress,
      selectable,
      style,
      /* eslint-disable */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      lineBreakMode,
      minimumFontScale,
      onLayout,
      onLongPress,
      pressRetentionOffset,
      selectionColor,
      suppressHighlighting,
      textBreakStrategy,
      tvParallaxProperties,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = this._createPressHandler(onPress);
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [
      styles.initial,
      isInAParentText === true && styles.isInAParentText,
      style,
      selectable === false && styles.notSelectable,
      numberOfLines === 1 && styles.singleLineStyle,
      onPress && styles.pressable
    ];

    const component = isInAParentText ? 'span' : 'div';

    return createElement(component, otherProps);
  }

  render() {
    return createElement(TextAncestor.Consumer, null, hasTextAncestor => {
      return hasTextAncestor
        ? this.renderInner(hasTextAncestor)
        : createElement(TextAncestor.Provider, { value: true }, this.renderInner(hasTextAncestor));
    });
  }

  _createEnterHandler(fn) {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }

  _createPressHandler(fn) {
    return e => {
      e.stopPropagation();
      fn && fn(e);
    };
  }
}

const styles = StyleSheet.create({
  initial: {
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline',
    fontFamily: 'System',
    fontSize: 14,
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  isInAParentText: {
    // inherit parent font styles
    fontFamily: 'inherit',
    fontSize: 'inherit',
    whiteSpace: 'inherit'
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export default applyLayout(applyNativeMethods(Text));
