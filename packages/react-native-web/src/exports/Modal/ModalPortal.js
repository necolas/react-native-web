/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { useEffect, useMemo } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import ReactDOM from 'react-dom';

export type ModalPortalProps = {|
  children: any
|};

function ModalPortal(props: ModalPortalProps) {
  const { children } = props;

  // Only create the element once.
  const element = useMemo(() => {
    if (canUseDOM) {
      return document.createElement('div')
    }
  }, []);

  useEffect(() => {
    if (canUseDOM && element && document.body) {
      document.body.appendChild(element);
    }

    return () => {
      if (canUseDOM && element && document.body) {
        document.body.removeChild(element);
      }
    }
  }, [element]);

  if (!canUseDOM || !element) {
    // If we can't use the DOM we cannot actually create a portal
    // via the ReactDOM.createPortal function!
    return null;
  }

  return ReactDOM.createPortal(children, element);
}

export default ModalPortal;
