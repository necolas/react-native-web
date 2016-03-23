import NativeMethodsDecorator from '../../modules/NativeMethodsDecorator'
import React, { Component, PropTypes } from 'react'
import ScrollView from '../ScrollView'

class ListView extends Component {
  static propTypes = {
    children: PropTypes.any,
    style: ScrollView.propTypes.style
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

module.exports = NativeMethodsDecorator(ListView)
