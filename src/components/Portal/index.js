/**
 * Copyright 2015-present, Nicolas Gallagher
 * Copyright 2004-present, Facebook Inc.
 * All Rights Reserved.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant'
import Platform from '../../apis/Platform'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import View from '../View'

let _portalRef: any
// unique identifiers for modals
let lastUsedTag = 0

/**
 * A container that renders all the modals on top of everything else in the application.
 */
export default class Portal extends Component {
  static propTypes = {
    onModalVisibilityChanged: PropTypes.func.isRequired
  };

  /**
   * Create a new unique tag.
   */
  static allocateTag(): string {
    return `__modal_${++lastUsedTag}`
  }

  /**
   * Render a new modal.
   */
  static showModal(tag: string, component: any) {
    if (!_portalRef) {
      console.error('Calling showModal but no "Portal" has been rendered.')
      return
    }
    _portalRef._showModal(tag, component)
  }

  /**
   * Remove a modal from the collection of modals to be rendered.
   */
  static closeModal(tag: string) {
    if (!_portalRef) {
      console.error('Calling closeModal but no "Portal" has been rendered.')
      return
    }
    _portalRef._closeModal(tag)
  }

  /**
   * Get an array of all the open modals, as identified by their tag string.
   */
  static getOpenModals(): Array<string> {
    if (!_portalRef) {
      console.error('Calling getOpenModals but no "Portal" has been rendered.')
      return []
    }
    return _portalRef._getOpenModals()
  }

  static notifyAccessibilityService() {
    if (!_portalRef) {
      console.error('Calling closeModal but no "Portal" has been rendered.')
      return
    }
    _portalRef._notifyAccessibilityService()
  }

  constructor(props) {
    super(props)
    this.state = { modals: {} }
    this._closeModal = this._closeModal.bind(this)
    this._getOpenModals = this._getOpenModals.bind(this)
    this._showModal = this._showModal.bind(this)
  }

  render() {
    invariant(
      _portalRef === this || _portalRef === undefined,
      'More than one Portal instance detected. Never use <Portal> in your code.'
    )
    _portalRef = this
    if (!this.state.modals) { return null }
    const modals = []
    for (const tag in this.state.modals) {
      modals.push(this.state.modals[tag])
    }
    if (modals.length === 0) { return null }

    return (
      <View style={styles.root}>
        {modals}
      </View>
    )
  }

  _closeModal(tag: string) {
    if (!this.state.modals.hasOwnProperty(tag)) {
      return
    }
    // We are about to close last modal, so Portal will disappear.
    // Let's enable accessibility for application view.
    if (this._getOpenModals().length === 1) {
      this.props.onModalVisibilityChanged(false)
    }
    // This way state is chained through multiple calls to
    // _showModal, _closeModal correctly.
    this.setState((state) => {
      const modals = state.modals
      delete modals[tag]
      return { modals }
    })
  }

  _getOpenModals(): Array<string> {
    return Object.keys(this.state.modals)
  }

  _notifyAccessibilityService() {
    if (Platform.OS === 'web') {
      // We need to send accessibility event in a new batch, as otherwise
      // TextViews have no text set at the moment of populating event.
    }
  }

  _showModal(tag: string, component: any) {
    // We are about to open first modal, so Portal will appear.
    // Let's disable accessibility for background view on Android.
    if (this._getOpenModals().length === 0) {
      this.props.onModalVisibilityChanged(true)
    }
    // This way state is chained through multiple calls to
    // _showModal, _closeModal correctly.
    this.setState((state) => {
      const modals = state.modals
      modals[tag] = component
      return { modals }
    })
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
})
