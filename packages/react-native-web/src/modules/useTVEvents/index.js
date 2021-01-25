/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

import * as React from 'react';
import { useEffect } from 'react';
import View from '../../exports/View';
import UIManager from '../../exports/UIManager';
import Platform from '../../exports/Platform';
import TVEventHandler from '../../exports/TVEventHandler';

type Event = any;

export type TVResponderConfig = $ReadOnly<{|
  hasTVPreferredFocus?: ?boolean,
  nextFocusDown?: ?any,
  nextFocusForward?: ?any,
  nextFocusLeft?: ?any,
  nextFocusRight?: ?any,
  nextFocusUp?: ?any,
  onPress?: ?(event: Event) => void,
  onFocus?: ?(event: Event) => void,
  onBlur?: ?(event: Event) => void,
|}>;

export default function useTVEvents(
  hostRef: React.ElementRef<typeof View>,
  config: TVResponderConfig
) {
  useEffect(() => {
    if (Platform.isTV && config.hasTVPreferredFocus) {
      if (hostRef.current) {
        UIManager.focus(hostRef.current);
      }
    }
  }, [config.hasTVPreferredFocus, hostRef]);

  function onKeyEvent(event: Event) {
    const { type, key } = event;
    // Get tvEvent
    const tvEvent = TVEventHandler.getTVEvent(event);
    // Dispatch 'select' tvEvent to component
    if (tvEvent.eventType === 'select') {
      if (config.onPress) {
        config.onPress(tvEvent);
      }
    }
    // Dispatch tvEvent to all listeners
    TVEventHandler.dispatchEvent(tvEvent);
    // Handle next focus
    let nextElement = null;
    // Check nextFocus properties set using : nextFocus*={findNodeHandle(ref.current)}
    if (config.nextFocusUp && key === 'ArrowUp') {
      nextElement = config.nextFocusUp;
    } else if (config.nextFocusRight && key === 'ArrowRight') {
      nextElement = config.nextFocusRight;
    } else if (config.nextFocusDown && key === 'ArrowDown') {
      nextElement = config.nextFocusDown;
    } else if (config.nextFocusLeft && key === 'ArrowLeft') {
      nextElement = config.nextFocusLeft;
    } else if (config.nextFocusForward && key === 'ArrowRight') {
      nextElement = config.nextFocusForward;
    }
    if (nextElement) {
      // Focus if element is focusable
      UIManager.focus(nextElement);
      // Stop event propagation
      event.stopPropagation();
    }
    // Check nextFocus properties set using : ref.current.setNativeProps({nextFocus*: nativeID}
    let nextFocusID = '';
    // Check nextFocus* properties
    if (hostRef.current.hasAttribute('nextFocusUp') && key === 'ArrowUp') {
      nextFocusID = hostRef.current.getAttribute('nextFocusUp');
    } else if (hostRef.current.hasAttribute('nextFocusRight') && key === 'ArrowRight') {
      nextFocusID = hostRef.current.getAttribute('nextFocusRight');
    } else if (hostRef.current.hasAttribute('nextFocusDown') && key === 'ArrowDown') {
      nextFocusID = hostRef.current.getAttribute('nextFocusDown');
    } else if (hostRef.current.hasAttribute('nextFocusLeft') && key === 'ArrowLeft') {
      nextFocusID = hostRef.current.getAttribute('nextFocusLeft');
    } else if (hostRef.current.hasAttribute('nextFocusForward') && key === 'ArrowRight') {
      nextFocusID = hostRef.current.getAttribute('nextFocusForward');
    }
    if (nextFocusID && nextFocusID !== '') {
      // Get DOM element
      nextElement = document.getElementById(nextFocusID);
      if (nextElement) {
        // Focus is element if focusable
        UIManager.focus(nextElement);
        // Stop event propagation
        event.stopPropagation();
      }
    }
    // Trigger Hardware Back Press for Back/Escape event keys
    if (type === 'keydown' && (key === 'Back' || key === 'Escape')) {
      // eslint-disable-next-line no-undef
      const hwKeyEvent = new CustomEvent('hardwareBackPress', {});
      document.dispatchEvent(hwKeyEvent);
    }
  }

  const tvEventHandlers = Platform.isTV
    ? {
        onFocus: (event: Event) => {
          // Get tvEvent
          const tvEvent = TVEventHandler.getTVEvent(event);
          // Dispatch tvEvent to component
          if (config.onFocus) {
            config.onFocus(tvEvent);
          }
          // Dispatch tvEvent to all listeners
          TVEventHandler.dispatchEvent(tvEvent);
        },
        onBlur: (event: Event) => {
          // Get tvEvent
          const tvEvent = TVEventHandler.getTVEvent(event);
          // Dispatch tvEvent to component
          if (config.onBlur) {
            config.onBlur(tvEvent);
          }
          // Dispatch tvEvent to all listeners
          TVEventHandler.dispatchEvent(tvEvent);
        },
        onKeyDown: onKeyEvent,
        onKeyUp: onKeyEvent,
      }
    : {};

  return tvEventHandlers;
}
