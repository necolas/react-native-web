/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/**
 * Hook for integrating the Responder System into React
 *
 *   function SomeComponent({ onStartShouldSetResponder }) {
 *     const ref = useRef(null);
 *     useResponderEvents(ref, { onStartShouldSetResponder });
 *     return <div ref={ref} />
 *   }
 */

import type { ResponderConfig } from './ResponderSystem';

import * as React from 'react';
import RootContext from '../../exports/AppRegistry/RootContext';

const emptyObject = {};
let idCounter = 0;

function useStable<T>(getInitialValue: () => T): T {
  const ref = React.useRef<T | null>(null);
  if (ref.current == null) {
    ref.current = getInitialValue();
  }
  return ref.current;
}

export default function useResponderEvents(hostRef: any, config: ResponderConfig = emptyObject) {
  const id = useStable(() => idCounter++);
  const isAttachedRef = React.useRef(false);
  const rootContext = React.useContext(RootContext);

  // This is a separate effects so it doesn't run when the config changes.
  // On initial mount, attach global listeners if needed.
  // On unmount, remove node potentially attached to the Responder System.
  React.useEffect(() => {
    rootContext.responderSystem.attachListeners();
    return () => {
      rootContext.responderSystem.removeNode(id);
    };
  }, [id, rootContext.responderSystem]);

  // Register and unregister with the Responder System as necessary
  React.useEffect(() => {
    const {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture
    } = config;

    const requiresResponderSystem =
      onMoveShouldSetResponder != null ||
      onMoveShouldSetResponderCapture != null ||
      onScrollShouldSetResponder != null ||
      onScrollShouldSetResponderCapture != null ||
      onSelectionChangeShouldSetResponder != null ||
      onSelectionChangeShouldSetResponderCapture != null ||
      onStartShouldSetResponder != null ||
      onStartShouldSetResponderCapture != null;

    const node = hostRef.current;

    if (requiresResponderSystem) {
      rootContext.responderSystem.addNode(id, node, config);
      isAttachedRef.current = true;
    } else if (isAttachedRef.current) {
      rootContext.responderSystem.removeNode(id);
      isAttachedRef.current = false;
    }
  }, [config, hostRef, id, rootContext.responderSystem]);

  React.useDebugValue({
    isResponder: hostRef.current === rootContext.responderSystem.getResponderNode()
  });
  React.useDebugValue(config);
}
