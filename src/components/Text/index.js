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
      selectable,
      /* eslint-disable */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      minimumFontScale,
      onLayout,
      onPress,
      suppressHighlighting,
      /* eslint-enable */
      ...other
    } = this.props;

    const combinedClassnames = classnames(
      '.rnw-Text',
      className,
      !selectable && '.rnw-Text-notSelectable',
      numberOfLines === 1 && '.rnw-Text-singleLineStyle',
      className
    );

    return createDOMElement('span', {
      ...other,
      onClick: this._onPress,
      className: combinedClassnames
    });
  }

  _onPress = (e) => {
    if (this.props.onPress) { this.props.onPress(e); }
  }
}

module.exports = applyLayout(applyNativeMethods(Text));
