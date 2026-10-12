/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import type { ViewProps } from '../View';

import * as React from 'react';
import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
import ModalFocusTrap from './ModalFocusTrap';
import useLayoutEffect from '../../modules/useLayoutEffect';

export type ModalProps = {
  ...ViewProps,
  animationType?: 'none' | 'slide' | 'fade',
  children: any,
  hardwareAccelerated?: ?boolean,
  onDismiss?: ?() => mixed,
  onOrientationChange?: ?(e: {|
    orientation: 'portrait' | 'landscape'
  |}) => void,
  onRequestClose?: ?() => void,
  onShow?: ?() => void,
  presentationStyle?: ?(
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'overFullScreen'
  ),
  statusBarTranslucent?: ?boolean,
  supportedOrientations?: ?Array<
    | 'portrait'
    | 'portrait-upside-down'
    | 'landscape'
    | 'landscape-left'
    | 'landscape-right'
  >,
  transparent?: ?boolean,
  visible?: ?boolean
};

let uniqueModalIdentifier = 0;

const activeModalStack = [];
const activeModalListeners = {};
// The modal each modal is rendered in, if any.
const parentModals = {};

const ModalContext = React.createContext(null);

function isInside(modalId, ancestorId) {
  for (let id = parentModals[modalId]; id != null; id = parentModals[id]) {
    if (id === ancestorId) {
      return true;
    }
  }
  return false;
}

function notifyActiveModalListeners() {
  if (activeModalStack.length === 0) {
    return;
  }
  const activeModalId = activeModalStack[activeModalStack.length - 1];
  activeModalStack.forEach((modalId) => {
    if (modalId in activeModalListeners) {
      activeModalListeners[modalId](modalId === activeModalId);
    }
  });
}

function removeActiveModal(modalId) {
  if (modalId in activeModalListeners) {
    // Before removing this listener we should probably tell it
    // that it's no longer the active modal for sure.
    activeModalListeners[modalId](false);
    delete activeModalListeners[modalId];
  }
  delete parentModals[modalId];
  const index = activeModalStack.indexOf(modalId);
  if (index !== -1) {
    activeModalStack.splice(index, 1);
    notifyActiveModalListeners();
  }
}

function addActiveModal(modalId, parentId, listener) {
  removeActiveModal(modalId);
  parentModals[modalId] = parentId;
  // A modal rendered inside this one, shown in the same commit, was added
  // first (layout effects run children first), and stays on top.
  const insideIndex = activeModalStack.findIndex((id) => isInside(id, modalId));
  activeModalStack.splice(
    insideIndex === -1 ? activeModalStack.length : insideIndex,
    0,
    modalId
  );
  activeModalListeners[modalId] = listener;
  notifyActiveModalListeners();
}

const Modal: React.AbstractComponent<
  ModalProps,
  React.ElementRef<typeof ModalContent>
> = React.forwardRef((props, forwardedRef) => {
  const {
    animationType,
    children,
    onDismiss,
    onRequestClose,
    onShow,
    transparent,
    visible = true,
    ...rest
  } = props;

  // Set a unique model identifier so we can correctly route
  // dismissals and check the layering of modals.
  const modalId = React.useMemo(() => uniqueModalIdentifier++, []);
  const parentModalId = React.useContext(ModalContext);

  const [isActive, setIsActive] = React.useState(false);

  const onDismissCallback = React.useCallback(() => {
    removeActiveModal(modalId);
    if (onDismiss) {
      onDismiss();
    }
  }, [modalId, onDismiss]);

  const onShowCallback = React.useCallback(() => {
    if (onShow) {
      onShow();
    }
  }, [onShow]);

  // Active from the commit that shows it, not once its animation has ended:
  // the modal below stops trapping focus and handling Escape before anything
  // in this one can take focus.
  useLayoutEffect(() => {
    if (visible) {
      addActiveModal(modalId, parentModalId, setIsActive);
    }
  }, [modalId, parentModalId, visible]);

  React.useEffect(() => {
    return () => removeActiveModal(modalId);
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
            {...rest}
            active={isActive}
            onRequestClose={onRequestClose}
            ref={forwardedRef}
            transparent={transparent}
          >
            <ModalContext.Provider value={modalId}>
              {children}
            </ModalContext.Provider>
          </ModalContent>
        </ModalFocusTrap>
      </ModalAnimation>
    </ModalPortal>
  );
});

export default Modal;
