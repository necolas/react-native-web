import React, { PropTypes } from 'react'
import restyle from './modules/restyle'
import StylePropTypes from './modules/StylePropTypes'

class WebStyleComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    style: PropTypes.object
  }

  static defaultProps = {
    className: '',
    component: 'div'
  }

  render() {
    const { component: Component, ...other } = this.props

    return (
      <Component
        {...other}
        {...restyle(this.props)}
      />
    )
  }
}

export { StylePropTypes, restyle, WebStyleComponent }
