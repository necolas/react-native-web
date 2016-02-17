import Portal from '../../components/Portal'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import StyleSheet from '../../apis/StyleSheet'
import View from '../../components/View'

export default class ReactNativeApp extends Component {
  static propTypes = {
    initialProps: PropTypes.object,
    rootComponent: PropTypes.any.isRequired,
    rootTag: PropTypes.any
  };

  constructor(props, context) {
    super(props, context)
    this._handleModalVisibilityChange = this._handleModalVisibilityChange.bind(this)
  }

  _handleModalVisibilityChange(modalVisible) {
    ReactDOM.findDOMNode(this._root).setAttribute('aria-hidden', `${modalVisible}`)
  }

  render() {
    const { initialProps, rootComponent: RootComponent, rootTag } = this.props

    return (
      <View style={styles.appContainer}>
        <RootComponent {...initialProps} ref={(c) => { this._root = c }} rootTag={rootTag} />
        <Portal onModalVisibilityChanged={this._handleModalVisibilityChange} />
      </View>
    )
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
