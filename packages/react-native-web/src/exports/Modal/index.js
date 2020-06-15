/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* global HTMLElement */
/* global FocusEvent */
/* global KeyboardEvent */
/* global Node */

import React from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import View from '../View';
import StyleSheet from '../StyleSheet';

import type { ModalProps } from './types';

import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import FocusBracket from './FocusBracket';

function attemptFocus(element: any) {
  try {
    element.focus();
  } catch (e) {
    // Do nothing
  }

  return document.activeElement === element;
}

function focusFirstDescendant(element: any) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];
    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
}

function focusLastDescendant(element: any) {
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
  _modalElement: ?HTMLElement;
  _trapFocusInProgress: boolean = false;
  _lastFocusedElement: ?HTMLElement;

  isTopModal() {
    if (visibleModalStack.length === 0) {
      return false;
    }

    return visibleModalStack[visibleModalStack.length - 1] === this;
  }

  _onRequestClose = () => {
    const { onRequestClose } = this.props;

    if (onRequestClose) {
      onRequestClose.call(this);
    }
  };

  _onDismiss = () => {
    const { onDismiss } = this.props;

    // When we dismiss we can't assume that we're dismissing the
    // top element in the stack - so search the stack and remove
    // ourselves from it if need be.
    if (visibleModalStack.includes(this)) {
      visibleModalStack.splice(visibleModalStack.indexOf(this), 1);
    }

    if (onDismiss) {
      onDismiss();
    }
  };

  _onShow = () => {
    const { onShow } = this.props;

    visibleModalStack.push(this);

    if (onShow) {
      onShow();
    }
  };

  _trapFocus = (e: FocusEvent) => {
    const { visible } = this.props;

    // If the modal isn't currently visible it shouldn't trap focus.
    if (!visible) {
      return;
    }

    // If this isn't the top modal we won't be counting it
    // for trapping focus.
    if (!this.isTopModal()) {
      return;
    }

    // Given that we re-focus as part of trapping focus,
    // we don't run to run this functionality while we're already
    // running it.
    if (this._trapFocusInProgress) {
      return;
    }

    // If the underlying modal element reference hasn't been set yet
    // we can't do much with trapping focus.
    if (!this._modalElement) {
      return;
    }

    try {
      this._trapFocusInProgress = true;

      // Only muck with the focus if the event target isn't within this modal
      if (e.target instanceof Node && !this._modalElement.contains(e.target)) {
        // To handle keyboard focusing we can make an assumption here.
        // If you're tabbing through the focusable elements, the previously
        // active element will either be the first or the last.
        //
        // If the previously selected element is the "first" descendant
        // and we're leaving it - this means that we should
        // be looping around to the other side of the modal.
        focusFirstDescendant(this._modalElement);
        if (this._lastFocusedElement === document.activeElement) {
          focusLastDescendant(this._modalElement);
        }
      }
    } finally {
      this._trapFocusInProgress = false;
    }

    this._lastFocusedElement = document.activeElement;
  };

  _closeOnEscape = (e: KeyboardEvent) => {
    const { visible } = this.props;

    if (!visible) {
      return;
    }

    if (!this.isTopModal()) {
      return;
    }

    if (e.key === 'Escape') {
      e.stopPropagation();
      this._onRequestClose();
    }
  };

  _setModalElementRef = (element: ?HTMLElement) => {
    this._modalElement = element;
  };

  componentDidMount() {
    if (canUseDOM) {
      document.addEventListener('keyup', this._closeOnEscape, false);
      document.addEventListener('focus', this._trapFocus, true);
    }
  }

  componentWillUnmount() {
    if (canUseDOM) {
      document.removeEventListener('keyup', this._closeOnEscape, false);
      document.removeEventListener('focus', this._trapFocus, true);
    }
  }

  render() {
    const { visible, animated, animationType, transparent, children } = this.props;

    const backgroundStyle = transparent ? styles.modalTransparent : styles.modalOpaque;

    return (
      <ModalPortal>
        <ModalAnimation
          animated={animated}
          animationType={animationType}
          onDismiss={this._onDismiss}
          onShow={this._onShow}
          style={[styles.modal, backgroundStyle]}
          visible={visible}
        >
          <FocusBracket />
          <View accessibilityRole="dialog" aria-modal forwardedRef={this._setModalElementRef}>
            <View style={[styles.container]}>{children}</View>
          </View>
          <FocusBracket />
        </ModalAnimation>
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
    zIndex: 9999
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
