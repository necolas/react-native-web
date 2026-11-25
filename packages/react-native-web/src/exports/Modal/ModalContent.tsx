/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  type ComponentRef,
  type ReactNode,
  type Ref,
  useLayoutEffect,
  useMemo
} from 'react';

import canUseDOM from '../../modules/canUseDom';
import type { Nullable } from '../../types';
import StyleSheet from '../StyleSheet';
import View, { type ViewProps } from '../View';

export type ModalContentProps = ViewProps & {
  active?: Nullable<boolean>;
  children?: ReactNode;
  onRequestClose?: Nullable<() => void>;
  ref?: Ref<ComponentRef<typeof View>>;
  transparent?: Nullable<boolean>;
};

const ModalContent = (props: ModalContentProps): ReactNode => {
  const { active, children, onRequestClose, transparent, ...rest } = props;

  useLayoutEffect(() => {
    if (canUseDOM && active) {
      const closeOnEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !e.repeat && !e.defaultPrevented) {
          e.stopPropagation();
          if (onRequestClose) {
            onRequestClose();
          }
        }
      };
      document.addEventListener('keydown', closeOnEscape, false);
      return () => {
        document.removeEventListener('keydown', closeOnEscape, false);
      };
    }
  }, [active, onRequestClose]);

  const style = useMemo(() => {
    return [
      styles.modal,
      transparent ? styles.modalTransparent : styles.modalOpaque
    ];
  }, [transparent]);

  return (
    <View
      {...rest}
      aria-modal={true}
      role={active ? 'dialog' : null}
      style={style}
    >
      <View style={styles.container}>{children}</View>
    </View>
  );
};

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
