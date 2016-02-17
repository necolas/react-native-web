import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import TextStylePropTypes from './TextStylePropTypes'

const textStyleKeys = Object.keys(TextStylePropTypes)

const styles = StyleSheet.create({
  initial: {
    color: 'inherit',
    display: 'inline',
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    wordWrap: 'break-word'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

export default class Text extends Component {
  static propTypes = {
    _className: PropTypes.string, // escape-hatch for code migrations
    accessibilityLabel: CoreComponent.propTypes.accessibilityLabel,
    accessibilityRole: CoreComponent.propTypes.accessibilityRole,
    accessible: CoreComponent.propTypes.accessible,
    children: PropTypes.any,
    numberOfLines: PropTypes.number,
    onPress: PropTypes.func,
    style: PropTypes.shape(TextStylePropTypes),
    testID: CoreComponent.propTypes.testID
  };

  static stylePropTypes = TextStylePropTypes;

  static defaultProps = {
    _className: '',
    accessible: true,
    style: styles.initial
  };

  _onPress(e) {
    if (this.props.onPress) this.props.onPress(e)
  }

  render() {
    const {
      _className,
      numberOfLines,
      onPress,
      style,
      ...other
    } = this.props

    const className = `${_className} Text`.trim()
    const resolvedStyle = pickProps(style, textStyleKeys)

    return (
      <CoreComponent
        {...other}
        className={className}
        component='span'
        onClick={this._onPress.bind(this)}
        style={{
          ...styles.initial,
          ...resolvedStyle,
          ...(numberOfLines === 1 && styles.singleLineStyle)
        }}
      />
    )
  }
}
