import NativeMethodsDecorator from '../../modules/NativeMethodsDecorator'
import CoreComponent from '../CoreComponent'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import StyleSheetPropType from '../../apis/StyleSheet/StyleSheetPropType'
import TextStylePropTypes from './TextStylePropTypes'

class Text extends Component {
  static propTypes = {
    accessibilityLabel: CoreComponent.propTypes.accessibilityLabel,
    accessibilityRole: CoreComponent.propTypes.accessibilityRole,
    accessible: CoreComponent.propTypes.accessible,
    children: PropTypes.any,
    numberOfLines: PropTypes.number,
    onPress: PropTypes.func,
    style: StyleSheetPropType(TextStylePropTypes),
    testID: CoreComponent.propTypes.testID
  };

  static defaultProps = {
    accessible: true
  };

  _onPress(e) {
    if (this.props.onPress) this.props.onPress(e)
  }

  render() {
    const {
      numberOfLines,
      onPress,
      style,
      ...other
    } = this.props

    return (
      <CoreComponent
        {...other}
        component='span'
        onClick={this._onPress.bind(this)}
        style={[
          styles.initial,
          style,
          numberOfLines === 1 && styles.singleLineStyle
        ]}
      />
    )
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

module.exports = NativeMethodsDecorator(Text)
