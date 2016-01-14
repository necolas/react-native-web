import React, { PropTypes } from 'react'
import ScrollView from '../ScrollView'

class ListView extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.style
  };

  static defaultProps = {
    style: {}
  };

  render() {
    return (
      <ScrollView {...this.props} />
    )
  }
}

export default ListView
