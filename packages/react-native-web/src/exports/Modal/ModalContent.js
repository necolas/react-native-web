/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { AbstractComponent, ElementRef } from 'react';

import React, { forwardRef, useMemo, useEffect } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import View from '../View';
import StyleSheet from '../StyleSheet';

export type ModalContentProps = {|
  active?: ?(boolean | (() => boolean)),
  children?: any,
  onRequestClose?: ?() => void,
  transparent?: ?boolean
|};

const ModalContent: AbstractComponent<ModalContentProps, ElementRef<typeof View>> = forwardRef(
  (props, forwardedRef) => {
    const { active, children, onRequestClose, transparent } = props;

    useEffect(() => {
      if (canUseDOM) {
        const closeOnEscape = (e: KeyboardEvent) => {
          if (active && e.key === 'Escape') {
            e.stopPropagation();
            if (onRequestClose) {
              onRequestClose();
            }
          }
        };
        document.addEventListener('keyup', closeOnEscape, false);
        return () => document.removeEventListener('keyup', closeOnEscape, false);
      }
    }, [active, onRequestClose]);

    const style = useMemo(() => {
      return [styles.modal, transparent ? styles.modalTransparent : styles.modalOpaque];
    }, [transparent]);

    return (
      <View
        accessibilityRole={active ? 'dialog' : null}
        aria-modal
        ref={forwardedRef}
        style={style}
      >
        <View style={styles.container}>{children}</View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
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
