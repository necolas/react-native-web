/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { useEffect, useState, useRef } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';

export type ModalPortalProps = {|
  children: any
|};

function ModalPortal(props: ModalPortalProps) {
  const { children } = props;

  const elementRef = useRef();
  const [mounted, setMounted] = useState()

  useEffect(() => {
    if (canUseDOM) {
      const element = document.createElement('div');

      if (element && document.body) {
        document.body.appendChild(element);
        elementRef.current = element;
        setMounted(true);
      }

      return () => {
        if (document.body) {
          document.body.removeChild(element);
        }
      };
    }
  }, []);

  return (mounted && elementRef.current && canUseDOM) ? ReactDOM.createPortal(children, elementRef.current) : null;
}

export default ModalPortal;
