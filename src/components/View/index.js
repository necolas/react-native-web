import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import ViewStylePropTypes from './ViewStylePropTypes'

const viewStyleKeys = Object.keys(ViewStylePropTypes)

const styles = StyleSheet.create({
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
    textDecoration: 'none',
    // button reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit'
  }
})

export default class View extends Component {
  static propTypes = {
    _className: PropTypes.string, // escape-hatch for code migrations
    accessibilityLabel: CoreComponent.propTypes.accessibilityLabel,
    accessibilityLiveRegion: CoreComponent.propTypes.accessibilityLiveRegion,
    accessibilityRole: CoreComponent.propTypes.accessibilityRole,
    accessible: CoreComponent.propTypes.accessible,
    children: PropTypes.any,
    pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
    style: PropTypes.shape(ViewStylePropTypes),
    testID: CoreComponent.propTypes.testID
  };

  static stylePropTypes = ViewStylePropTypes;

  static defaultProps = {
    _className: '',
    accessible: true,
    style: styles.initial
  };

  render() {
    const {
      _className,
      pointerEvents,
      style,
      ...other
    } = this.props

    const className = `${_className} View`.trim()
    const pointerEventsStyle = pointerEvents && { pointerEvents }
    const resolvedStyle = pickProps(style, viewStyleKeys)

    return (
      <CoreComponent
        {...other}
        className={className}
        style={{
          ...styles.initial,
          ...resolvedStyle,
          ...pointerEventsStyle
        }}
      />
    )
  }
}
