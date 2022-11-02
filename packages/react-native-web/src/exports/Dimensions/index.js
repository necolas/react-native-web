/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { EventSubscription } from '../../vendor/react-native/emitter/EventEmitter';
import invariant from 'fbjs/lib/invariant';
import canUseDOM from '../../modules/canUseDom';

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

const dimensions = {
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
};
const listeners = {};

let shouldInit = canUseDOM;

function update() {
  if (!canUseDOM) {
    return;
  }

  const win = window;
  const docEl = win.document.documentElement;

  dimensions.window = {
    fontScale: 1,
    height: docEl.clientHeight,
    scale: win.devicePixelRatio || 1,
    width: docEl.clientWidth
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
    listeners['change'].forEach((handler) => handler(dimensions));
  }
}

export default class Dimensions {
  static get(dimension: DimensionKey): DisplayMetrics {
    if (shouldInit) {
      shouldInit = false;
      update();
    }
    invariant(dimensions[dimension], `No dimension set for key ${dimension}`);
    return dimensions[dimension];
  }

  static set(initialDimensions: ?DimensionsValue): void {
    if (initialDimensions) {
      if (canUseDOM) {
        invariant(false, 'Dimensions cannot be set in the browser');
      } else {
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
}

if (canUseDOM) {
  window.addEventListener('resize', handleResize, false);
}
