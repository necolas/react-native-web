import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import ViewStylePropTypes from './ViewStylePropTypes'

const styles = {
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    // button reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit'
  }
}

class View extends React.Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    children: PropTypes.any,
    component: CoreComponent.propTypes.component,
    pointerEvents: PropTypes.oneOf([
      'auto',
      'box-none',
      'box-only',
      'none'
    ]),
    style: PropTypes.shape(ViewStylePropTypes),
    testID: CoreComponent.propTypes.testID
  }

  static stylePropTypes = ViewStylePropTypes

  static defaultProps = {
    component: 'div',
    style: styles.initial
  }

  render() {
    const { accessibilityLabel, pointerEvents, style, testID, ...other } = this.props
    const pointerEventsStyle = pointerEvents && { pointerEvents }
    const resolvedStyle = pickProps(style, Object.keys(ViewStylePropTypes))

    return (
      <CoreComponent
        {...other}
        aria-label={accessibilityLabel}
        className={'View'}
        style={{
          ...(styles.initial),
          ...resolvedStyle,
          ...pointerEventsStyle
        }}
        testID={testID}
      />
    )
  }
}

export default View
