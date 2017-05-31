/**
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import { Component } from 'react';
import createDOMElement from '../../modules/createDOMElement';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from './TextStylePropTypes';
import { any, bool, func, number, oneOf } from 'prop-types';

class Text extends Component {
  static displayName = 'Text';

  static propTypes = {
    ...BaseComponentPropTypes,
    accessibilityRole: oneOf(['button', 'heading', 'link', 'listitem']),
    children: any,
    numberOfLines: number,
    onLayout: func,
    onPress: func,
    selectable: bool,
    style: StyleSheetPropType(TextStylePropTypes)
  };

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
      suppressHighlighting,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = onPress;
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [
      styles.initial,
      this.context.isInAParentText !== true && styles.preserveWhitespace,
      style,
      selectable === false && styles.notSelectable,
      numberOfLines === 1 && styles.singleLineStyle,
      onPress && styles.pressable
    ];

    return createDOMElement('div', otherProps);
  }

  _createEnterHandler(fn) {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }
}

const styles = StyleSheet.create({
  initial: {
    borderWidth: 0,
    color: 'inherit',
    display: 'inline',
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    wordWrap: 'break-word'
  },
  preserveWhitespace: {
    whiteSpace: 'pre-wrap'
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

module.exports = applyLayout(applyNativeMethods(Text));
