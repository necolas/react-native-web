/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import canUseDOM from '../../modules/canUseDom';

export type ModalPortalProps = {
  children: ReactNode;
};

function ModalPortal(props: ModalPortalProps): ReactNode {
  const { children } = props;
  const elementRef = useRef<HTMLDivElement>(null);

  if (canUseDOM && !elementRef.current) {
    const element = document.createElement('div');

    if (element && document.body) {
      document.body.appendChild(element);
      elementRef.current = element;
    }
  }

  // StrictMode runs the cleanup and then the effect again on the same
  // instance, so the effect attaches the element back
  useEffect(() => {
    const element = elementRef.current;

    if (element != null && document.body) {
      if (element.parentNode !== document.body) {
        document.body.appendChild(element);
      }

      return () => {
        element.remove();
      };
    }
  }, []);

  return elementRef.current && canUseDOM
    ? createPortal(children, elementRef.current)
    : null;
}

export default ModalPortal;
