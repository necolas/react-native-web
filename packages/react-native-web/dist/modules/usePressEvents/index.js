/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

import PressResponder from './PressResponder';
import { useDebugValue, useEffect, useRef } from 'react';
export default function usePressEvents(hostRef, config) {
  var pressResponderRef = useRef(null);

  if (pressResponderRef.current == null) {
    pressResponderRef.current = new PressResponder(config);
  }

  var pressResponder = pressResponderRef.current; // Re-configure to use the current node and configuration.

  useEffect(function () {
    pressResponder.configure(config);
  }, [config, pressResponder]); // Reset the `pressResponder` when cleanup needs to occur. This is
  // a separate effect because we do not want to rest the responder when `config` changes.

  useEffect(function () {
    return function () {
      pressResponder.reset();
    };
  }, [pressResponder]);
  useDebugValue(config);
  return pressResponder.getEventHandlers();
}