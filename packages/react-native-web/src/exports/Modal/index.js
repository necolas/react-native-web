/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { forwardRef, useCallback, useMemo, useEffect } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import View from '../View';
import StyleSheet from '../StyleSheet';

import type { ModalProps } from './types';

import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import ModalFocusTrap from './ModalFocusTrap';

let uniqueModalIdentifier = 0;

const visibleModalStack = [];

function isTopModal(modalId) {
  if (visibleModalStack.length === 0) {
    return false;
  }

  return visibleModalStack[visibleModalStack.length - 1] === modalId;
}

const Modal = forwardRef<ModalProps, *>((props, forwardedRef) => {
  const {
    visible,
    animated,
    animationType,
    transparent,
    children,
    onShow,
    onDismiss,
    onRequestClose
  } = props;

  // Set a unique model identifier so we can correctly route
  // dismissals and check the layering of modals.
  const modalId = useMemo(() => uniqueModalIdentifier++, []);

  const onDismissCallback = useCallback(() => {
    // When we dismiss we can't assume that we're dismissing the
    // top element in the stack - so search the stack and remove
    // ourselves from it if need be.
    if (visibleModalStack.indexOf(modalId) !== -1) {
      visibleModalStack.splice(visibleModalStack.indexOf(modalId), 1);
    }

    if (onDismiss) {
      onDismiss();
    }
  }, [modalId, onDismiss]);

  const onShowCallback = useCallback(() => {
    visibleModalStack.push(modalId);

    if (onShow) {
      onShow();
    }
  }, [modalId, onShow]);

  const isTrappingCallback = useCallback(() => {
    return visible && isTopModal(modalId)
  }, [visible, modalId]);

  const closeOnEscapeCallback = useCallback((e: KeyboardEvent) => {
    // If the modal that received this event is not visible or
    // is not the top modal in the stack it should ignore the event.
    if (!visible || !isTopModal(modalId)) {
      return;
    }

    if (e.key === 'Escape') {
      e.stopPropagation();

      if (onRequestClose) {
        onRequestClose();
      }
    }
  }, [modalId, visible, onRequestClose]);

  // Bind to the document itself for this component
  useEffect(() => {
    if (canUseDOM) {
      document.addEventListener('keyup', closeOnEscapeCallback, false);
    }

    return () => {
      if (canUseDOM) {
        document.removeEventListener('keyup', closeOnEscapeCallback, false);
      }
    };
  }, [closeOnEscapeCallback]);

  const backgroundStyle = transparent ? styles.modalTransparent : styles.modalOpaque;

  return (
    <ModalPortal>
      <ModalAnimation
        animated={animated}
        animationType={animationType}
        onDismiss={onDismissCallback}
        onShow={onShowCallback}
        style={[styles.modal, backgroundStyle]}
        visible={visible}
      >
        <ModalFocusTrap active={isTrappingCallback}>
          <View accessibilityRole="dialog" aria-modal ref={forwardedRef}>
            <View style={[styles.container]}>{children}</View>
          </View>
        </ModalFocusTrap>
      </ModalAnimation>
    </ModalPortal>
  );
});

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
