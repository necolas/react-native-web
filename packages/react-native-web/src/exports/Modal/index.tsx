/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import {
  type ComponentRef,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';

import type { Nullable } from '../../types';
import type View from '../View';
import type { ViewProps } from '../View';
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
import ModalFocusTrap from './ModalFocusTrap';
import ModalPortal from './ModalPortal';

export type ModalProps = ViewProps & {
  animationType?: 'none' | 'slide' | 'fade';
  children?: ReactNode;
  hardwareAccelerated?: Nullable<boolean>;
  onDismiss?: Nullable<() => unknown>;
  onOrientationChange?: Nullable<
    (e: { orientation: 'portrait' | 'landscape' }) => void
  >;
  onRequestClose?: Nullable<() => void>;
  onShow?: Nullable<() => void>;
  ref?: Ref<ComponentRef<typeof View>>;
  presentationStyle?: Nullable<
    'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen'
  >;
  statusBarTranslucent?: Nullable<boolean>;
  supportedOrientations?: Nullable<
    Array<
      | 'portrait'
      | 'portrait-upside-down'
      | 'landscape'
      | 'landscape-left'
      | 'landscape-right'
    >
  >;
  transparent?: Nullable<boolean>;
  visible?: Nullable<boolean>;
};

let uniqueShowIdentifier = 0;

// The modal shown last is the active one
const shownModals: Map<(active: boolean) => void, number> = new Map();

function notifyActiveModalListeners() {
  let activeListener: ((active: boolean) => void) | null = null;
  let activeShowId = -1;

  shownModals.forEach((showId, listener) => {
    if (showId > activeShowId) {
      activeListener = listener;
      activeShowId = showId;
    }
  });

  shownModals.forEach((showId, listener) => {
    listener(listener === activeListener);
  });
}

function removeActiveModal(listener: (active: boolean) => void) {
  if (shownModals.delete(listener)) {
    // Before removing this listener we should probably tell it
    // that it's no longer the active modal for sure.
    listener(false);
    notifyActiveModalListeners();
  }
}

function addActiveModal(listener: (active: boolean) => void, showId: number) {
  shownModals.set(listener, showId);
  notifyActiveModalListeners();
}

const Modal = (props: ModalProps): ReactNode => {
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

  // Set in render, not in an effect: parents render before their children, so
  // a nested modal shown with its parent gets a higher id
  const showId = useMemo(
    () => (visible ? uniqueShowIdentifier++ : -1),
    [visible]
  );

  const [isActive, setIsActive] = useState(false);

  const onDismissCallback = useCallback(() => {
    // The modal can be shown again in the update that ends its close
    if (!visible) {
      removeActiveModal(setIsActive);
    }

    onDismiss?.();
  }, [onDismiss, visible]);

  // Active when shown, not when the animation ends, so the modal below stops
  // trapping focus and handling Escape
  useLayoutEffect(() => {
    if (visible) {
      addActiveModal(setIsActive, showId);
    }
  }, [showId, visible]);

  useEffect(() => {
    return () => removeActiveModal(setIsActive);
  }, []);

  return (
    <ModalPortal>
      <ModalAnimation
        animationType={animationType}
        onDismiss={onDismissCallback}
        onShow={onShow}
        visible={visible}
      >
        <ModalFocusTrap active={isActive}>
          <ModalContent
            {...rest}
            active={isActive}
            onRequestClose={onRequestClose}
            transparent={transparent}
          >
            {children}
          </ModalContent>
        </ModalFocusTrap>
      </ModalAnimation>
    </ModalPortal>
  );
};

export default Modal;
