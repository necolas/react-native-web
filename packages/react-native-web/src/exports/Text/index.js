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
import { bool } from 'prop-types';
import { Component } from 'react';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import StyleSheet from '../StyleSheet';
import TextPropTypes from './TextPropTypes';

class Text extends Component<*> {
  static displayName = 'Text';

  static propTypes = TextPropTypes;

  static childContextTypes = {
    isInAParentText: bool
  };

  static contextTypes = {
    isInAParentText: bool
  };

  getChildContext() {
    return { isInAParentText: true };
  }

  render() {
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

    const { isInAParentText: hasTextAncestor } = this.context;

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = this._createPressHandler(onPress);
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    otherProps.className = css.combine(
      classes.text,
      hasTextAncestor ? classes.textHasAncestor : classes.textIsRoot,
      numberOfLines === 1 && classes.textSingleLine
    );
    otherProps.style = [
      style,
      selectable === false && styles.notSelectable,
      onPress && styles.pressable
    ];
    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';

    const component = hasTextAncestor ? 'span' : 'div';

    return createElement(component, otherProps);
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

const classes = css.create({
  text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    boxSizing: 'border-box',
    display: 'inline',
    margin: 0,
    padding: 0,
    textAlign: 'inherit',
    wordWrap: 'break-word'
  },
  textIsRoot: {
    color: 'black',
    font: 'normal 14px System',
    textDecoration: 'none',
    whiteSpace: 'pre-wrap'
  },
  textHasAncestor: {
    color: 'inherit',
    font: 'inherit',
    textDecoration: 'inherit',
    whiteSpace: 'inherit'
  },
  // "!important" is used to prevent essential styles from being overridden
  // by merged styles
  textSingleLine: {
    maxWidth: '100%',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis !important',
    whiteSpace: 'nowrap !important'
  }
});

const styles = StyleSheet.create({
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  }
});

export default applyLayout(applyNativeMethods(Text));
