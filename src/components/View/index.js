import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import ViewStylePropTypes from './ViewStylePropTypes'

const viewStyleKeys = Object.keys(ViewStylePropTypes)

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
    _className: PropTypes.string, // escape-hatch for code migrations
    accessibilityLabel: PropTypes.string,
    accessibilityLiveRegion: PropTypes.oneOf(['assertive', 'off', 'polite']),
    accessibilityRole: PropTypes.string,
    accessible: PropTypes.bool,
    children: PropTypes.any,
    component: CoreComponent.propTypes.component,
    pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
    style: PropTypes.shape(ViewStylePropTypes),
    testID: CoreComponent.propTypes.testID
  }

  static stylePropTypes = ViewStylePropTypes

  static defaultProps = {
    _className: '',
    accessible: true,
    component: 'div',
    style: styles.initial
  }

  render() {
    const {
      _className,
      accessibilityLabel,
      accessibilityLiveRegion,
      accessibilityRole,
      accessible,
      pointerEvents,
      style,
      testID,
      ...other
    } = this.props

    const className = `View ${_className}`.trim()
    const pointerEventsStyle = pointerEvents && { pointerEvents }
    const resolvedStyle = pickProps(style, viewStyleKeys)

    return (
      <CoreComponent
        {...other}
        aria-hidden={accessible ? null : true}
        aria-label={accessibilityLabel}
        aria-live={accessibilityLiveRegion}
        className={className}
        role={accessibilityRole}
        style={{
          ...styles.initial,
          ...resolvedStyle,
          ...pointerEventsStyle
        }}
        testID={testID}
      />
    )
  }
}

export default View
