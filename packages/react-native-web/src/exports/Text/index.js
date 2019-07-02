/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import warning from 'fbjs/lib/warning';
import React from 'react';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from './TextAncestorContext';
import TextPropTypes from './TextPropTypes';

class Text extends React.Component<*> {
  static displayName = 'Text';

  static propTypes = TextPropTypes;

  renderText(hasTextAncestor) {
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
      maxFontSizeMultiplier,
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

    if (process.env.NODE_ENV !== 'production') {
      warning(this.props.className == null, 'Using the "className" prop on <Text> is deprecated.');
    }

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = this._createPressHandler(onPress);
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    otherProps.classList = [
      this.props.className,
      classes.text,
      hasTextAncestor === true && classes.textHasAncestor,
      numberOfLines === 1 && classes.textOneLine,
      numberOfLines > 1 && classes.textMultiLine
    ];
    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [
      style,
      numberOfLines > 1 && { WebkitLineClamp: numberOfLines },
      selectable === false && styles.notSelectable,
      onPress && styles.pressable
    ];

    const component = hasTextAncestor ? 'span' : 'div';

    return createElement(component, otherProps);
  }

  render() {
    return (
      <TextAncestorContext.Consumer>
        {hasTextAncestor => {
          const element = this.renderText(hasTextAncestor);
          return hasTextAncestor ? (
            element
          ) : (
            <TextAncestorContext.Provider value={true}>{element}</TextAncestorContext.Provider>
          );
        }}
      </TextAncestorContext.Consumer>
    );
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
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: '14px System',
    margin: 0,
    padding: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  textHasAncestor: {
    color: 'inherit',
    font: 'inherit',
    whiteSpace: 'inherit'
  },
  textOneLine: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // See #13
  textMultiLine: {
    display: '-webkit-box',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical'
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
