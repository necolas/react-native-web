/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import canUseDOM from '../../modules/canUseDom';

type ChangeHandler = (enabled: boolean) => void;
type EventSubscription = { remove: () => void };

const createMedia = (query: string, fallback: boolean) => {
  if (!canUseDOM || typeof window.matchMedia !== 'function') {
    return {
      get matches(): boolean {
        return fallback;
      },
      addChangeHandler(handler: ChangeHandler): EventSubscription {
        return { remove() {} };
      }
    };
  }

  // Wrap each handler in an object so the same function can be registered twice
  const handlers: Set<{ handler: ChangeHandler }> = new Set();
  const media = window.matchMedia(query);

  const listener = (event: MediaQueryListEvent) => {
    // Copy so mutations during emit do not change this invocation
    [...handlers].forEach(({ handler }) => handler(event.matches));
  };

  return {
    get matches(): boolean {
      return media.matches;
    },
    addChangeHandler(handler: ChangeHandler): EventSubscription {
      const entry = { handler };

      if (handlers.size === 0) {
        media.addEventListener('change', listener);
      }

      handlers.add(entry);

      return {
        remove() {
          if (handlers.delete(entry) && handlers.size === 0) {
            media.removeEventListener('change', listener);
          }
        }
      };
    }
  };
};

const prefersContrastMedia = createMedia('(prefers-contrast: more)', false);
const prefersReducedMotionMedia = createMedia(
  '(prefers-reduced-motion: reduce)',
  true
);
const prefersReducedTransparencyMedia = createMedia(
  '(prefers-reduced-transparency: reduce)',
  false
);

const AccessibilityInfo = {
  announceForAccessibility(announcement: string): void {},

  announceForAccessibilityWithOptions(
    announcement: string,
    options: { queue?: boolean, priority?: 'low' | 'default' | 'high' }
  ): void {},

  getRecommendedTimeoutMillis: (originalTimeout: number): Promise<number> =>
    Promise.resolve(originalTimeout),

  isAccessibilityServiceEnabled: (): Promise<boolean> => Promise.resolve(true),
  isBoldTextEnabled: (): Promise<boolean> => Promise.resolve(false),
  isDarkerSystemColorsEnabled: (): Promise<boolean> => Promise.resolve(false),
  isGrayscaleEnabled: (): Promise<boolean> => Promise.resolve(false),
  isInvertColorsEnabled: (): Promise<boolean> => Promise.resolve(false),
  isScreenReaderEnabled: (): Promise<boolean> => Promise.resolve(true),
  prefersCrossFadeTransitions: (): Promise<boolean> => Promise.resolve(false),

  isHighTextContrastEnabled: (): Promise<boolean> =>
    Promise.resolve(prefersContrastMedia.matches),
  isReduceMotionEnabled: (): Promise<boolean> =>
    Promise.resolve(prefersReducedMotionMedia.matches),
  isReduceTransparencyEnabled: (): Promise<boolean> =>
    Promise.resolve(prefersReducedTransparencyMedia.matches),

  addEventListener(eventName: string, handler: Function): EventSubscription {
    if (eventName === 'highTextContrastChanged') {
      return prefersContrastMedia.addChangeHandler(handler);
    } else if (eventName === 'reduceMotionChanged') {
      return prefersReducedMotionMedia.addChangeHandler(handler);
    } else if (eventName === 'reduceTransparencyChanged') {
      return prefersReducedTransparencyMedia.addChangeHandler(handler);
    }

    return { remove() {} };
  },

  sendAccessibilityEvent(
    handle: HTMLElement,
    eventType: 'click' | 'focus' | 'viewHoverEnter' | 'windowStateChange'
  ): void {
    if (eventType === 'focus') {
      try {
        handle.focus();
      } catch {}
    }
  },

  /**
   * Set accessibility focus to a React component.
   *
   * @deprecated Use `sendAccessibilityEvent` with eventType `focus` instead.
   */
  setAccessibilityFocus(node: HTMLElement): void {
    try {
      node.focus();
    } catch {}
  }
};

export default AccessibilityInfo;
