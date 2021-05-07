/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
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
import * as React from 'react';
import * as ResponderSystem from './ResponderSystem';
var emptyObject = {};
var idCounter = 0;

function useStable(getInitialValue) {
  var ref = React.useRef(null);

  if (ref.current == null) {
    ref.current = getInitialValue();
  }

  return ref.current;
}

export default function useResponderEvents(hostRef, config) {
  if (config === void 0) {
    config = emptyObject;
  }

  var id = useStable(function () {
    return idCounter++;
  });
  var isAttachedRef = React.useRef(false); // This is a separate effects so it doesn't run when the config changes.
  // On initial mount, attach global listeners if needed.
  // On unmount, remove node potentially attached to the Responder System.

  React.useEffect(function () {
    ResponderSystem.attachListeners();
    return function () {
      ResponderSystem.removeNode(id);
    };
  }, [id]); // Register and unregister with the Responder System as necessary

  React.useEffect(function () {
    var _config = config,
        onMoveShouldSetResponder = _config.onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture = _config.onMoveShouldSetResponderCapture,
        onScrollShouldSetResponder = _config.onScrollShouldSetResponder,
        onScrollShouldSetResponderCapture = _config.onScrollShouldSetResponderCapture,
        onSelectionChangeShouldSetResponder = _config.onSelectionChangeShouldSetResponder,
        onSelectionChangeShouldSetResponderCapture = _config.onSelectionChangeShouldSetResponderCapture,
        onStartShouldSetResponder = _config.onStartShouldSetResponder,
        onStartShouldSetResponderCapture = _config.onStartShouldSetResponderCapture;
    var requiresResponderSystem = onMoveShouldSetResponder != null || onMoveShouldSetResponderCapture != null || onScrollShouldSetResponder != null || onScrollShouldSetResponderCapture != null || onSelectionChangeShouldSetResponder != null || onSelectionChangeShouldSetResponderCapture != null || onStartShouldSetResponder != null || onStartShouldSetResponderCapture != null;
    var node = hostRef.current;

    if (requiresResponderSystem) {
      ResponderSystem.addNode(id, node, config);
      isAttachedRef.current = true;
    } else if (isAttachedRef.current) {
      ResponderSystem.removeNode(id);
      isAttachedRef.current = false;
    }
  }, [config, hostRef, id]);
  React.useDebugValue({
    isResponder: hostRef.current === ResponderSystem.getResponderNode()
  });
  React.useDebugValue(config);
}