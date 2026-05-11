/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import type { EventSubscription } from '../../vendor/react-native/vendor/emitter/EventEmitter';
import invariant from 'fbjs/lib/invariant';
import canUseDOM from '../../modules/canUseDom';
import { getScopedState } from '../../modules/asyncContext';

export type DisplayMetrics = {|
  fontScale: number,
  height: number,
  scale: number,
  width: number
|};

type DimensionsValue = {|
  window: DisplayMetrics,
  screen: DisplayMetrics
|};

type DimensionKey = 'window' | 'screen';

type DimensionEventListenerType = 'change';

const createDefaultDimensions = (): DimensionsValue => ({
  window: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  },
  screen: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  }
});

// `dimensions` is the only piece of module state that needs per-request
// isolation: each SSR render writes its own `window` / `screen` values via
// `Dimensions.set`, and `Dimensions.get` reads them back. On the client
// and outside any request scope this returns a stable process singleton.
function getDimensions(): DimensionsValue {
  return getScopedState('Dimensions', createDefaultDimensions);
}

// Event listeners are runtime subscriptions added post-mount; on the
// server no resize events fire. Keeping these module-level matches the
// historical singleton behavior and avoids spurious per-request maps.
const listeners = {};

let shouldInit = canUseDOM;
let setForHydration = false;

function update() {
  if (!canUseDOM) {
    return;
  }

  const win = window;
  let height;
  let width;

  /**
   * iOS does not update viewport dimensions on keyboard open/close.
   * window.visualViewport(https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
   * is used instead of document.documentElement.clientHeight (which remains as a fallback)
   */
  if (win.visualViewport) {
    const visualViewport = win.visualViewport;
    /**
     * We are multiplying by scale because height and width from visual viewport
     * also react to pinch zoom, and become smaller when zoomed. But it is not desired
     * behaviour, since originally documentElement client height and width were used,
     * and they do not react to pinch zoom.
     */
    height = Math.round(visualViewport.height * visualViewport.scale);
    width = Math.round(visualViewport.width * visualViewport.scale);
  } else {
    const docEl = win.document.documentElement;
    height = docEl.clientHeight;
    width = docEl.clientWidth;
  }

  const dimensions = getDimensions();
  dimensions.window = {
    fontScale: 1,
    height,
    scale: win.devicePixelRatio || 1,
    width
  };

  dimensions.screen = {
    fontScale: 1,
    height: win.screen.height,
    scale: win.devicePixelRatio || 1,
    width: win.screen.width
  };
}

function handleResize() {
  update();
  if (Array.isArray(listeners['change'])) {
    const dimensions = getDimensions();
    listeners['change'].forEach((handler) => handler(dimensions));
  }
}

export default class Dimensions {
  static get(dimension: DimensionKey): DisplayMetrics {
    if (shouldInit && !setForHydration) {
      shouldInit = false;
      update();
    }
    const dimensions = getDimensions();
    invariant(dimensions[dimension], `No dimension set for key ${dimension}`);
    return dimensions[dimension];
  }

  static set(initialDimensions: ?DimensionsValue): void {
    if (initialDimensions) {
      if (canUseDOM) {
        invariant(false, 'Dimensions cannot be set in the browser');
      } else {
        const dimensions = getDimensions();
        if (initialDimensions.screen != null) {
          dimensions.screen = initialDimensions.screen;
        }
        if (initialDimensions.window != null) {
          dimensions.window = initialDimensions.window;
        }
      }
    }
  }

  static addEventListener(
    type: DimensionEventListenerType,
    handler: (DimensionsValue) => void
  ): EventSubscription {
    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);

    return {
      remove: () => {
        this.removeEventListener(type, handler);
      }
    };
  }

  static removeEventListener(
    type: DimensionEventListenerType,
    handler: (DimensionsValue) => void
  ): void {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(
        (_handler) => _handler !== handler
      );
    }
  }

  static unsafe_setForHydration(initialDimensions: ?DimensionsValue): void {
    if (initialDimensions) {
      if (!canUseDOM) {
        invariant(
          false,
          'Dimensions unsafe_setForHydration should only be used in the browser'
        );
      } else {
        setForHydration = true;
        const dimensions = getDimensions();
        if (initialDimensions.screen != null) {
          dimensions.screen = initialDimensions.screen;
        }
        if (initialDimensions.window != null) {
          dimensions.window = initialDimensions.window;
        }
      }
    }
  }

  static unsafe_restoreFromHydration(): void {
    setForHydration = false;
    update();
  }
}

if (canUseDOM) {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize, false);
  } else {
    window.addEventListener('resize', handleResize, false);
  }
}
