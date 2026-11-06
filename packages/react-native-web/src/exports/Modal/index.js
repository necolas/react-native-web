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
import typeof View from '../View';

import * as React from 'react';
import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
import ModalFocusTrap from './ModalFocusTrap';

export type ModalProps = {
  ...ViewProps,
  animationType?: 'none' | 'slide' | 'fade',
  children: any,
  hardwareAccelerated?: ?boolean,
  onDismiss?: ?() => unknown,
  onOrientationChange?: ?(e: {|
    orientation: 'portrait' | 'landscape'
  |}) => void,
  onRequestClose?: ?() => void,
  onShow?: ?() => void,
  ref?: React.Ref<React.ElementRef<View>>,
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

let uniqueShowIdentifier = 0;

// The modal shown last is the active one
const shownModals: Map<(active: boolean) => void, number> = new Map();

function notifyActiveModalListeners() {
  let activeListener = null;
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

const Modal = (props: ModalProps): React.Node => {
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
  const showId = React.useMemo(
    () => (visible ? uniqueShowIdentifier++ : -1),
    [visible]
  );

  const [isActive, setIsActive] = React.useState(false);

  const onDismissCallback = React.useCallback(() => {
    // The modal can be shown again in the update that ends its close
    if (!visible) {
      removeActiveModal(setIsActive);
    }

    onDismiss?.();
  }, [onDismiss, visible]);

  // Active when shown, not when the animation ends, so the modal below stops
  // trapping focus and handling Escape
  React.useLayoutEffect(() => {
    if (visible) {
      addActiveModal(setIsActive, showId);
    }
  }, [showId, visible]);

  React.useEffect(() => {
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
          {/* $FlowFixMe[incompatible-type] Unsupported props are dropped by View */}
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
