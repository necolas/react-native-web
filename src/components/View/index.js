import CoreComponent from '../CoreComponent'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import StyleSheetPropType from '../../apis/StyleSheet/StyleSheetPropType'
import ViewStylePropTypes from './ViewStylePropTypes'

export default class View extends Component {
  static propTypes = {
    accessibilityLabel: CoreComponent.propTypes.accessibilityLabel,
    accessibilityLiveRegion: CoreComponent.propTypes.accessibilityLiveRegion,
    accessibilityRole: CoreComponent.propTypes.accessibilityRole,
    accessible: CoreComponent.propTypes.accessible,
    children: PropTypes.any,
    pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
    style: StyleSheetPropType(ViewStylePropTypes),
    testID: CoreComponent.propTypes.testID
  };

  static defaultProps = {
    accessible: true
  };

  render() {
    const {
      pointerEvents,
      style,
      ...other
    } = this.props

    const pointerEventsStyle = pointerEvents && { pointerEvents }

    return (
      <CoreComponent
        {...other}
        style={[
          styles.initial,
          style,
          pointerEventsStyle
        ]}
      />
    )
  }
}

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
