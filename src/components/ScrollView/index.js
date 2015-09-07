import React, { PropTypes } from 'react'
import View from '../View'

class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {
    className: ''
  }

  render() {
    return (
      <View {...this.props} />
    )
  }
}

export default ScrollView
