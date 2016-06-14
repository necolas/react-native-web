import Portal from '../../components/Portal'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import StyleSheet from '../StyleSheet'
import View from '../../components/View'

class ReactNativeApp extends Component {
  static propTypes = {
    initialProps: PropTypes.object,
    rootComponent: PropTypes.any.isRequired,
    rootTag: PropTypes.any
  };

  render() {
    const { initialProps, rootComponent: RootComponent, rootTag } = this.props

    return (
      <View style={styles.appContainer}>
        <RootComponent {...initialProps} ref={this._createRootRef} rootTag={rootTag} />
        <Portal onModalVisibilityChanged={this._handleModalVisibilityChange} />
      </View>
    )
  }

  _createRootRef = (component) => {
    this._root = component
  }

  _handleModalVisibilityChange = (modalVisible) => {
    ReactDOM.findDOMNode(this._root).setAttribute('aria-hidden', `${modalVisible}`)
  }
}

const styles = StyleSheet.create({
  /**
   * Ensure that the application covers the whole screen. This prevents the
   * Portal content from being clipped.
   */
  appContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
})

module.exports = ReactNativeApp
