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

export type ModalContentProps = {|
  children?: any,

  active?: ?(boolean | () => boolean),

  transparent?: ?boolean,

  onRequestClose?: ?() => void,
|};

const ModalContent = forwardRef<ModalContentProps, *>((props, forwardedRef) => {
  const {
    active,
    transparent,
    children,
    onRequestClose
  } = props;

  const closeOnEscapeCallback = useCallback((e: KeyboardEvent) => {
    // If the modal that received this event is not considered the "active" modal we
    // should ignore this event
    if (!active) {
      return;
    }

    if (e.key === 'Escape') {
      e.stopPropagation();

      if (onRequestClose) {
        onRequestClose();
      }
    }
  }, [active, onRequestClose]);

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

  return (
    <View accessibilityRole="dialog" aria-modal ref={forwardedRef} style={style}>
      <View style={styles.container}>{children}</View>
    </View>
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

export default ModalContent;
