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

const activeModalStack = [];

function isActiveModal(modalId) {
  if (activeModalStack.length === 0) {
    return false;
  }

  return activeModalStack[activeModalStack.length - 1] === modalId;
}

function removeActiveModal(modalId) {
  // In the off chance the active modal appears multiple times
  // we can do this as a loop
  while (activeModalStack.indexOf(modalId) !== -1) {
    activeModalStack.splice(activeModalStack.indexOf(modalId), 1);
  }
}

function addActiveModal(modalId) {
  removeActiveModal(modalId);

  activeModalStack.push(modalId);
}

const Modal = forwardRef<ModalProps, *>((props, forwardedRef) => {
  const {
    visible,
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

  const isActive = useCallback(() => {
    return !!(visible && isActiveModal(modalId));
  }, [visible, modalId]);

  const onDismissCallback = useCallback(() => {
    // When we dismiss we can't assume that we're dismissing the
    // top element in the stack - so search the stack and remove
    // ourselves from it if need be.
    removeActiveModal(modalId);

    if (onDismiss) {
      onDismiss();
    }
  }, [modalId, onDismiss]);

  const onShowCallback = useCallback(() => {
    addActiveModal(modalId);

    if (onShow) {
      onShow();
    }
  }, [modalId, onShow]);

  const closeOnEscapeCallback = useCallback((e: KeyboardEvent) => {
    // If the modal that received this event is not visible or
    // is not the top modal in the stack it should ignore the event.
    if (isActive()) {
      return;
    }

    if (e.key === 'Escape') {
      e.stopPropagation();

      if (onRequestClose) {
        onRequestClose();
      }
    }
  }, [isActive, onRequestClose]);

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

  const style = useMemo(() => {
    return [styles.modal, transparent ? styles.modalTransparent : styles.modalOpaque];
  }, [transparent]);

  useEffect(() => {
    // When this component is unmounted we should remove the modal from
    // the active modal stack.  This is to handle the case of us unmounting
    // a visible modal so we don't end up with a broken stack
    return () => removeActiveModal(modalId)
  }, [modalId]);

  return (
    <ModalPortal>
      <ModalAnimation
        animationType={animationType}
        onDismiss={onDismissCallback}
        onShow={onShowCallback}
        visible={visible}
      >
        <ModalFocusTrap active={isActive}>
          <View accessibilityRole="dialog" aria-modal ref={forwardedRef} style={style}>
            <View style={styles.container}>{children}</View>
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
