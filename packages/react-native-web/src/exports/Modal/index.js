/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { forwardRef, useCallback, useMemo, useEffect, useState } from 'react';

import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
import ModalFocusTrap from './ModalFocusTrap';

type OrientationChangeEvent = {|
  orientation: 'portrait' | 'landscape'
|};

export type AnimationType = 'none' | 'slide' | 'fade';

export type ModalProps = {|
  children: any,
  visible?: ?boolean,
  animationType?: AnimationType,
  presentationStyle?: ?('fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen'),
  transparent?: ?boolean,
  onOrientationChange?: ?(e: OrientationChangeEvent) => void,
  supportedOrientations?: ?Array<
    'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'
    >,
  statusBarTranslucent?: ?boolean,
  hardwareAccelerated?: ?boolean,
  onRequestClose?: ?() => void,
  onShow?: ?() => void,
  onDismiss?: ?() => mixed
|};

let uniqueModalIdentifier = 0;

const activeModalStack = [];
const activeModalListeners = {};

function notifyActiveModalListeners () {
  if (activeModalStack.length === 0) {
    return;
  }

  const activeModalId = activeModalStack[activeModalStack.length - 1];

  for (const modalId of activeModalStack) {
    if (modalId in activeModalListeners) {
      activeModalListeners[modalId](modalId === activeModalId);
    }
  }
}

function removeActiveModal(modalId) {
  if (modalId in activeModalListeners) {
    // Before removing this listener we should probably tell it
    // that it's no longer the active modal for sure.
    activeModalListeners[modalId](false);
    delete activeModalListeners[modalId];
  }

  const index = activeModalStack.indexOf(modalId);

  if (index !== -1) {
    activeModalStack.splice(index, 1);
    notifyActiveModalListeners();
  }
}

function addActiveModal(modalId, listener) {
  removeActiveModal(modalId);

  activeModalStack.push(modalId);
  activeModalListeners[modalId] = listener;

  notifyActiveModalListeners();
}

const Modal = forwardRef<ModalProps, *>((props, forwardedRef) => {
  const {
    visible = true,
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

  const [isActive, setIsActive] = useState(false);

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
    addActiveModal(modalId, setIsActive);

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
            onRequestClose={onRequestClose}
            ref={forwardedRef}
            transparent={transparent}
          >
            {children}
          </ModalContent>
        </ModalFocusTrap>
      </ModalAnimation>
    </ModalPortal>
  );
});

export default Modal;
