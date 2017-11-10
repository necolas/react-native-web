/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Modal
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider, Slot, Fill } from 'react-slot-fill';
import View from '../View';
import StyleSheet from '../../apis/StyleSheet';
import I18nManager from '../../apis/I18nManager';
import Platform from '../../apis/Platform';

const MODAL_SLOT_NAME = '__modals__';

class ModalRoot extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <Provider>
        {this.props.children}
        <View style={styles.container}>
          <Slot name={MODAL_SLOT_NAME} />
        </View>
      </Provider>
    );
  }
}

/**
 * The Modal component is a simple way to present content above an enclosing view.
 *
 * _Note: If you need more control over how to present modals over the rest of your app,
 * then consider using a top-level Navigator._
 *
 * ```javascript
 * import React, { Component } from 'react';
 * import { Modal, Text, TouchableHighlight, View } from 'react-native';
 *
 * class ModalExample extends Component {
 *
 *   state = {
 *     modalVisible: false,
 *   }
 *
 *   setModalVisible(visible) {
 *     this.setState({modalVisible: visible});
 *   }
 *
 *   render() {
 *     return (
 *       <View style={{marginTop: 22}}>
 *         <Modal
 *           animationType="slide"
 *           transparent={false}
 *           visible={this.state.modalVisible}
 *           onRequestClose={() => {alert("Modal has been closed.")}}
 *           >
 *          <View style={{marginTop: 22}}>
 *           <View>
 *             <Text>Hello World!</Text>
 *
 *             <TouchableHighlight onPress={() => {
 *               this.setModalVisible(!this.state.modalVisible)
 *             }}>
 *               <Text>Hide Modal</Text>
 *             </TouchableHighlight>
 *
 *           </View>
 *          </View>
 *         </Modal>
 *
 *         <TouchableHighlight onPress={() => {
 *           this.setModalVisible(true)
 *         }}>
 *           <Text>Show Modal</Text>
 *         </TouchableHighlight>
 *
 *       </View>
 *     );
 *   }
 * }
 * ```
 */
export default class Modal extends React.Component {
  static propTypes = {
    /**
     * The `animationType` prop controls how the modal animates.
     *
     * - `slide` slides in from the bottom
     * - `fade` fades into view
     * - `none` appears without an animation
     *
     * Default is set to `none`.
     */
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    children: PropTypes.any.isrequired,
    /**
     * The `hardwareAccelerated` prop controls whether to force hardware acceleration for the underlying window.
     * @platform android
     */
    hardwareAccelerated: PropTypes.bool,
    /**
     * The `onDismiss` prop allows passing a function that will be called once the modal has been dismissed.
     * @platform ios
     */
    onDismiss: PropTypes.func,
    /**
     * The `onOrientationChange` callback is called when the orientation changes while the modal is being displayed.
     * The orientation provided is only 'portrait' or 'landscape'. This callback is also called on initial render, regardless of the current orientation.
     * @platform ios
     */
    onOrientationChange: PropTypes.func,
    /**
     * The `onRequestClose` callback is called when the user taps the hardware back button on Android or the menu button on Apple TV.
     */
    onRequestClose:
      Platform.isTVOS || Platform.OS === 'android' ? PropTypes.func.isRequired : PropTypes.func,
    /**
     * The `onShow` prop allows passing a function that will be called once the modal has been shown.
     */
    onShow: PropTypes.func,
    /**
     * The `presentationStyle` prop controls how the modal appears (generally on larger devices such as iPad or plus-sized iPhones).
     * See https://developer.apple.com/reference/uikit/uimodalpresentationstyle for details.
     * @platform ios
     *
     * - `fullScreen` covers the screen completely
     * - `pageSheet` covers portrait-width view centered (only on larger devices)
     * - `formSheet` covers narrow-width view centered (only on larger devices)
     * - `overFullScreen` covers the screen completely, but allows transparency
     *
     * Default is set to `overFullScreen` or `fullScreen` depending on `transparent` property.
     */
    presentationStyle: PropTypes.oneOf(['fullScreen', 'pageSheet', 'formSheet', 'overFullScreen']),
    /**
     * The `supportedOrientations` prop allows the modal to be rotated to any of the specified orientations.
     * On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field.
     * When using `presentationStyle` of `pageSheet` or `formSheet`, this property will be ignored by iOS.
     * @platform ios
     */
    supportedOrientations: PropTypes.arrayOf(
      PropTypes.oneOf([
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right'
      ])
    ),
    /**
     * The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.
     */
    transparent: PropTypes.bool,
    /**
     * The `visible` prop determines whether your modal is visible.
     */
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: true,
    hardwareAccelerated: false
  };

  static Root = ModalRoot;

  render() {
    const { visible } = this.props;

    return (
      visible && (
        <Fill name={MODAL_SLOT_NAME}>
          <View style={styles.modal}>{this.props.children}</View>
        </Fill>
      )
    );
  }
}

const side = I18nManager.isRTL ? 'right' : 'left';
const styles = StyleSheet.create({
  modal: {
    position: 'absolute'
  },
  container: {
    position: 'absolute',
    [side]: 0,
    top: 0
  }
});
