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
import FocusBracket from './FocusBracket';

function attemptFocus (element) {
  try {
    element.focus();
  } catch (e) {
    // Do nothing
  }

  return document.activeElement === element;
}

function focusFirstDescendant (element) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];
    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
}

function focusLastDescendant (element) {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];
    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
}

const visibleModalStack = [];

class Modal extends React.Component<ModalProps> {
  _modalElement: Node;
  _trapFocusInProgress: boolean = false;
  _lastFocusedElement: Node;

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  isTopModal () {
    if (visibleModalStack.length === 0) {
      return false;
    }

    return visibleModalStack[visibleModalStack.length - 1] === this;
  }

  onDismiss () {
    const { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss.call(this);
    }
  }

  onShow () {
    const { onShow } = this.props;

    if (onShow) {
      onShow.call(this);
    }
  }

  onRequestClose () {
    const { onRequestClose } = this.props;

    if (onRequestClose) {
      onRequestClose.call(this);
    }
  }

  show () {
    visibleModalStack.push(this);

    this.onShow();
    this.setState({ visible: true });
  }

  close () {
    if (visibleModalStack.includes(this)) {
      visibleModalStack.splice(visibleModalStack.indexOf(this), 1);
    }

    this.onDismiss();
    this.setState({ visible: false });
  }

  _trapFocus = (e) => {
    const { visible } = this.props;

    if (!visible || this._modalElement == null) {
      return;
    }

    if (!this.isTopModal()) {
      return;
    }

    if (this._trapFocusInProgress) {
      return;
    }

    try {
      this._trapFocusInProgress = true;

      if (!this._modalElement.contains(e.target)) {
        focusFirstDescendant(this._modalElement);
        if (this._lastFocusedElement === document.activeElement) {
          focusLastDescendant(this._modalElement);
        }
      }
    } finally {
      this._trapFocusInProgress = false;
    }

    this._lastFocusedElement = document.activeElement;
  }

  _closeOnEscape = (e) => {
    const { visible } = this.props;

    if (!visible) {
      return;
    }

    if (!this.isTopModal()) {
      return;
    }

    if (e.key === 'Escape') {
      event.stopPropagation();

      this.onRequestClose();
    }
  }

  _setModalElementRef = (element) => {
    this._modalElement = element
  }

  componentDidMount() {
    const { visible } = this.props;

    if (visible) {
      this.show();
    }

    document.addEventListener('keyup', this._closeOnEscape, false);
    document.addEventListener('focus', this._trapFocus, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this._closeOnEscape, false);
    document.removeEventListener('focus', this._trapFocus, true);
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
      this._setModalElementRef(null);
      return null;
    }

    const containerStyles = transparent ? styles.modalTransparent : styles.modalOpaque;

    return (
      <ModalPortal>
        <FocusBracket />
        <View forwardedRef={this._setModalElementRef} accessibilityRole="dialog" aria-modal style={[styles.modal]}>
          <View style={[styles.container, containerStyles]}>
            {children}
          </View>
        </View>
        <FocusBracket />
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
  },
  focusBracket: {
    outline: 'none'
  }
});

export default Modal;
