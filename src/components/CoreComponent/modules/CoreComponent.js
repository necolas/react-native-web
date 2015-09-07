import React, { PropTypes } from 'react'
import restyle from './restyle'
import stylePropTypes from './stylePropTypes'

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

  static stylePropTypes = stylePropTypes;

  static defaultProps = {
    className: '',
    component: 'div'
  }

  render() {
    const {
      className,
      component: Component,
      style,
      testID,
      ...other
    } = this.props

    return (
      <Component
        {...other}
        {...restyle({ className, style })}
        data-testid={process.env.NODE_ENV === 'production' ? null : testID}
      />
    )
  }
}

export default CoreComponent
