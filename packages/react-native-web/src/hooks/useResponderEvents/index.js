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

import type { ResponderCallbacks } from './ResponderSystem';

import * as React from 'react';
import * as ResponderSystem from './ResponderSystem';

const emptyObject = {};
let idCounter = 0;

function useStable<T>(getInitialValue: () => T): T {
  const ref = React.useRef<T | null>(null);
  if (ref.current == null) {
    ref.current = getInitialValue();
  }
  return ref.current;
}

export default function useResponderEvents(
  hostRef: any,
  callbacks: ResponderCallbacks = emptyObject
) {
  const id = useStable(() => idCounter++);
  const isAttachedRef = React.useRef(false);

  // These are separate effects so they doesn't run when `callbacks` changes.
  // On initial mount, attach global listeners if needed.
  React.useEffect(() => {
    ResponderSystem.attachListeners();
  }, []);
  // On unmount, remove node potentially attached to the Responder System.
  React.useEffect(() => {
    return () => {
      ResponderSystem.removeNode(id);
    };
  }, [id]);

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
    } = callbacks;

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
      ResponderSystem.addNode(id, node, callbacks);
      isAttachedRef.current = true;
    } else if (isAttachedRef.current) {
      ResponderSystem.removeNode(id);
      isAttachedRef.current = false;
    }
  }, [callbacks, hostRef, id]);
}
