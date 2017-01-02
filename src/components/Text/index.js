import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import createDOMElement from '../../modules/createDOMElement';
import StyleSheet from 'apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from './TextStylePropTypes';
import { Component, PropTypes } from 'react';

class Text extends Component {
  static displayName = 'Text';

  static propTypes = {
    ...BaseComponentPropTypes,
    accessibilityRole: PropTypes.oneOf([ 'button', 'heading', 'link', 'listitem' ]),
    children: PropTypes.any,
    numberOfLines: PropTypes.number,
    onLayout: PropTypes.func,
    onPress: PropTypes.func,
    selectable: PropTypes.bool,
    style: StyleSheetPropType(TextStylePropTypes)
  };

  static defaultProps = {
    accessible: true,
    selectable: true
  };

  render() {
    const {
      numberOfLines,
      onPress,
      selectable,
      style,
      /* eslint-disable */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      minimumFontScale,
      onLayout,
      suppressHighlighting,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    if (onPress) {
      otherProps.onClick = onPress;
      otherProps.onKeyDown = this._createEnterHandler(onPress);
      otherProps.tabIndex = 0;
    }

    otherProps.style = [
      styles.initial,
      style,
      !selectable && styles.notSelectable,
      numberOfLines === 1 && styles.singleLineStyle,
      onPress && styles.pressable
    ];

    return createDOMElement('span', otherProps);
  }

  _createEnterHandler(fn) {
    return (e) => {
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
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
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
