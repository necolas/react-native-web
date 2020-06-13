/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';

import View from '../View';

import StyleSheet from '../StyleSheet';
import { ModalProps } from './types';
import ModalPortal from './ModalPortal';

class Modal extends React.Component<ModalProps> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  onDismiss () {
    const { onDismiss: propsOnDismiss } = this.props;

    if (propsOnDismiss) {
      propsOnDismiss.call(this);
    }
  }

  onShow () {
    const { onShow: propsOnShow } = this.props;

    if (propsOnShow) {
      propsOnShow.call(this);
    }
  }

  show () {
    this.onShow();
    this.setState({ visible: true });
  }

  close () {
    this.onDismiss();
    this.setState({ visible: false });
  }

  componentDidMount() {
    const { visible } = this.props;

    if (visible) {
      this.show();
    }
  }

  componentDidUpdate(prevProps: ModalProps) {
    const { visible: wasVisible } = prevProps;
    const {
      visible
    } = this.props;

    if (visible !== wasVisible) {
      if (visible) {
        this.show();
      } else {
        this.close();
      }
    }
  }

  render() {
    let {
      transparent,
      children
    } = this.props;

    const { visible } = this.state;

    if (visible !== true) {
      return null;
    }

    const containerStyles = transparent ? styles.modalTransparent : styles.modalOpaque;

    return (
      <ModalPortal>
        <View style={[styles.modal]}>
          <View style={[styles.container, containerStyles]}>
            {children}
          </View>
        </View>
      </ModalPortal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999,
  },
  modalTransparent: {
    backgroundColor: 'transparent'
  },
  modalOpaque: {
    backgroundColor: 'white'
  },
  container: {
    top: 0,
    flex: 1
  }
});

export default Modal;
