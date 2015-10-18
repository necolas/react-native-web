import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import StyleSheet from '../../modules/StyleSheet'
import TextStylePropTypes from './TextStylePropTypes'

const textStyleKeys = Object.keys(TextStylePropTypes)

const styles = StyleSheet.create({
  initial: {
    color: 'inherit',
    display: 'inline-block',
    font: 'inherit',
    margin: 0,
    padding: 0,
    wordWrap: 'break-word'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

class Text extends React.Component {
  static propTypes = {
    _className: PropTypes.string, // escape-hatch for code migrations
    accessibilityLabel: PropTypes.string,
    accessible: PropTypes.bool,
    children: PropTypes.any,
    component: CoreComponent.propTypes.component,
    numberOfLines: PropTypes.number,
    onPress: PropTypes.func,
    style: PropTypes.shape(TextStylePropTypes),
    testID: CoreComponent.propTypes.testID
  }

  static stylePropTypes = TextStylePropTypes

  static defaultProps = {
    _className: '',
    accessible: true,
    component: 'span',
    style: styles.initial
  }

  _onPress(e) {
    if (this.props.onPress) this.props.onPress(e)
  }

  render() {
    const {
      _className,
      accessibilityLabel,
      accessible,
      children,
      component,
      numberOfLines,
      onPress,
      style,
      testID,
      ...other
    } = this.props

    const className = `Text ${_className}`.trim()
    const resolvedStyle = pickProps(style, textStyleKeys)

    return (
      <CoreComponent
        {...other}
        aria-hidden={accessible ? null : true}
        aria-label={accessibilityLabel}
        children={children}
        className={className}
        component={component}
        onClick={this._onPress.bind(this)}
        style={{
          ...styles.initial,
          ...resolvedStyle,
          ...(numberOfLines === 1 && styles.singleLineStyle)
        }}
        testID={testID}
      />
    )
  }
}

export default Text
