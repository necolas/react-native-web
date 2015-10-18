import React, { PropTypes } from 'react'
import StylePropTypes from '../../modules/StylePropTypes'
import StyleSheet from '../../modules/StyleSheet'

class CoreComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    style: PropTypes.object,
    testID: PropTypes.string
  }

  static defaultProps = {
    component: 'div'
  }

  static stylePropTypes = StylePropTypes;

  render() {
    const {
      component: Component,
      testID,
      ...other
    } = this.props

    return (
      <Component
        {...other}
        {...StyleSheet.resolve(other)}
        data-testid={testID}
      />
    )
  }
}

export default CoreComponent
