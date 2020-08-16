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

import type { ModalProps } from './types';

import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
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
          <ModalContent
            active={isActive}
            transparent={transparent}
            onRequestClose={onRequestClose}
            ref={forwardedRef}
          >
            {children}
          </ModalContent>
        </ModalFocusTrap>
      </ModalAnimation>
    </ModalPortal>
  );
});

export default Modal;
