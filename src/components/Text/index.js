import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import TextStylePropTypes from './TextStylePropTypes'

const textStyleKeys = Object.keys(TextStylePropTypes)

const styles = {
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
}

class Text extends React.Component {
  static propTypes = {
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
    component: 'span',
    style: styles.initial
  }

  _onPress(e) {
    if (this.props.onPress) this.props.onPress(e)
  }

  render() {
    const {
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

    const resolvedStyle = pickProps(style, textStyleKeys)

    return (
      <CoreComponent
        {...other}
        aria-hidden={accessible ? null : true}
        aria-label={accessibilityLabel}
        children={children}
        className={'Text'}
        component={component}
        onClick={this._onPress.bind(this)}
        style={{
          ...(styles.initial),
          ...resolvedStyle,
          ...(numberOfLines === 1 && styles.singleLineStyle)
        }}
        testID={testID}
      />
    )
  }
}

export default Text
