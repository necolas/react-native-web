/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from '../../modules/canUseDom';
import type { Nullable } from '../../types';

export type ModalPortalProps = {
  children: React.ReactNode;
};

function ModalPortal(props: ModalPortalProps): React.ReactNode {
  const { children } = props;
  const elementRef = React.useRef<Nullable<HTMLDivElement>>(null);

  if (canUseDOM && !elementRef.current) {
    const element = document.createElement('div');

    if (element && document.body) {
      document.body.appendChild(element);
      elementRef.current = element;
    }
  }

  React.useEffect(() => {
    if (canUseDOM) {
      return () => {
        if (document.body && elementRef.current) {
          document.body.removeChild(elementRef.current);
          elementRef.current = null;
        }
      };
    }
  }, []);

  return elementRef.current && canUseDOM
    ? createPortal(children, elementRef.current)
    : null;
}

export default ModalPortal;
