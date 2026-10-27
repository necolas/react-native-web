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

import canUseDOM from '../../modules/canUseDom';

export type ColorSchemeName = 'light' | 'dark';

type AppearanceListener = (preferences: {|
  colorScheme: ColorSchemeName
|}) => void;

const prefersDarkQuery: MediaQueryList | null =
  canUseDOM && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

let colorSchemeOverride: ColorSchemeName | null = null;
const listeners = new Set<AppearanceListener>();

function getColorScheme(): ColorSchemeName {
  return colorSchemeOverride ?? (prefersDarkQuery?.matches ? 'dark' : 'light');
}

function notifyListeners() {
  for (const listener of Array.from(listeners)) {
    listener({ colorScheme: getColorScheme() });
  }
}

// Notify listeners when the system theme changes, unless an override is set
prefersDarkQuery?.addEventListener('change', () => {
  if (colorSchemeOverride == null) {
    notifyListeners();
  }
});

const Appearance = {
  getColorScheme,

  setColorScheme(colorScheme: ColorSchemeName | 'auto' | 'unspecified'): void {
    if (canUseDOM) {
      const prevColorScheme = getColorScheme();

      colorSchemeOverride =
        colorScheme === 'light' || colorScheme === 'dark' ? colorScheme : null;

      // Make form controls, scrollbars and light-dark() follow the override
      if (document.documentElement != null) {
        document.documentElement.style.colorScheme = colorSchemeOverride ?? '';
      }

      if (getColorScheme() !== prevColorScheme) {
        notifyListeners();
      }
    }
  },

  addChangeListener(listener: AppearanceListener): { remove: () => void } {
    listeners.add(listener);

    return {
      remove() {
        listeners.delete(listener);
      }
    };
  }
};

export default Appearance;
