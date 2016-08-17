import applyLayout from '../../modules/applyLayout'
import applyNativeMethods from '../../modules/applyNativeMethods'
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes'
import createDOMElement from '../../modules/createDOMElement'
import { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import StyleSheetPropType from '../../propTypes/StyleSheetPropType'
import TextStylePropTypes from './TextStylePropTypes'

class Text extends Component {
  static displayName = 'Text'

  static propTypes = {
    ...BaseComponentPropTypes,
    accessibilityRole: PropTypes.oneOf([ 'heading', 'link' ]),
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
      onLayout, // eslint-disable-line
      onPress, // eslint-disable-line
      selectable,
      style,
      ...other
    } = this.props

    return createDOMElement('span', {
      ...other,
      onClick: this._onPress,
      style: [
        styles.initial,
        style,
        !selectable && styles.notSelectable,
        numberOfLines === 1 && styles.singleLineStyle
      ]
    })
  }

  _onPress = (e) => {
    if (this.props.onPress) this.props.onPress(e)
  }
}

applyLayout(applyNativeMethods(Text))

const styles = StyleSheet.create({
  initial: {
    color: 'inherit',
    display: 'inline',
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    wordWrap: 'break-word'
  },
  notSelectable: {
    userSelect: 'none'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

module.exports = Text
