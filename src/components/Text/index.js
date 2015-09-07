import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import TextStylePropTypes from './TextStylePropTypes'

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
    const { children, component, numberOfLines, style, testID } = this.props
    const resolvedStyle = pickProps(style, Object.keys(TextStylePropTypes))

    return (
      <CoreComponent
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
