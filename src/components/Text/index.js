import createNativeComponent from '../../modules/createNativeComponent'
import NativeMethodsDecorator from '../../modules/NativeMethodsDecorator'
import { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import StyleSheetPropType from '../../apis/StyleSheet/StyleSheetPropType'
import TextStylePropTypes from './TextStylePropTypes'

@NativeMethodsDecorator
class Text extends Component {
  static propTypes = {
    accessibilityLabel: createNativeComponent.propTypes.accessibilityLabel,
    accessibilityRole: createNativeComponent.propTypes.accessibilityRole,
    accessible: createNativeComponent.propTypes.accessible,
    children: PropTypes.any,
    numberOfLines: PropTypes.number,
    onPress: PropTypes.func,
    style: StyleSheetPropType(TextStylePropTypes),
    testID: createNativeComponent.propTypes.testID
  };

  static defaultProps = {
    accessible: true
  };

  _onPress = (e) => {
    if (this.props.onPress) this.props.onPress(e)
  }

  render() {
    const {
      numberOfLines,
      /* eslint-disable no-unused-vars */
      onPress,
      /* eslint-enable no-unused-vars */
      style,
      ...other
    } = this.props

    return createNativeComponent({
      ...other,
      component: 'span',
      onClick: this._onPress,
      style: [
        styles.initial,
        style,
        numberOfLines === 1 && styles.singleLineStyle
      ]
    })
  }
}

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
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

module.exports = Text
