import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import createDOMElement from '../../modules/createDOMElement';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from './TextStylePropTypes';
import { Component, PropTypes } from 'react';
import classnames from 'classnames';

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
      className,
      numberOfLines,
      onPress,
      selectable,
      /* eslint-disable */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      minimumFontScale,
      onLayout,
      suppressHighlighting,
      /* eslint-enable */
      ...other
    } = this.props;

    if (onPress) {
      other.onClick = onPress;
      other.onKeyDown = this._createEnterHandler(onPress);
      other.tabIndex = 0;
    }

    const combinedClassnames = classnames(
      '.rnw-Text',
      className,
      !selectable && '.rnw-Text-notSelectable',
      numberOfLines === 1 && '.rnw-Text-singleLineStyle',
      onPress && '.rnw-Text-pressable'
    );

    return createDOMElement('span', {
      ...other,
      className: combinedClassnames
    });
  }

  _createEnterHandler(fn) {
    return (e) => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }
}

module.exports = applyLayout(applyNativeMethods(Text));
