import React, { PropTypes } from 'react'
import ScrollView from '../ScrollView'

class ListView extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {
    className: ''
  }

  render() {
    return (
      <ScrollView {...this.props} />
    )
  }
}

export default ListView
