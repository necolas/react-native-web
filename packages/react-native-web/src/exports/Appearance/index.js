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

export type AppearancePreferences = {|
  colorScheme: ColorSchemeName
|};

type ColorSchemeSetting = ColorSchemeName | 'auto' | 'unspecified' | null;
type AppearanceListener = (preferences: AppearancePreferences) => void;
type DOMAppearanceListener = (ev: MediaQueryListEvent) => any;

function getQuery(): MediaQueryList | null {
  return canUseDOM && window.matchMedia != null
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
}

const query = getQuery();
let colorSchemeOverride: ColorSchemeName | null = null;
const appearanceListeners = new Set<AppearanceListener>();
const listenerMapping = new WeakMap<
  AppearanceListener,
  DOMAppearanceListener
>();

function getSystemColorScheme(): ColorSchemeName {
  return query && query.matches ? 'dark' : 'light';
}

function notifyListeners(colorScheme: ColorSchemeName): void {
  Array.from(appearanceListeners).forEach((listener) => {
    listener({ colorScheme });
  });
}

const Appearance = {
  getColorScheme(): ColorSchemeName {
    return colorSchemeOverride ?? getSystemColorScheme();
  },

  setColorScheme(colorScheme: ColorSchemeSetting): void {
    const previousColorScheme = Appearance.getColorScheme();
    colorSchemeOverride =
      colorScheme === 'light' || colorScheme === 'dark' ? colorScheme : null;
    const nextColorScheme = Appearance.getColorScheme();

    if (nextColorScheme !== previousColorScheme) {
      notifyListeners(nextColorScheme);
    }
  },

  addChangeListener(listener: AppearanceListener): { remove: () => void } {
    appearanceListeners.add(listener);
    let mappedListener = listenerMapping.get(listener);
    if (!mappedListener) {
      mappedListener = () => {
        if (colorSchemeOverride == null) {
          listener({ colorScheme: getSystemColorScheme() });
        }
      };
      listenerMapping.set(listener, mappedListener);
    }
    if (query) {
      query.addListener(mappedListener);
    }

    function remove(): void {
      const mappedListener = listenerMapping.get(listener);
      if (query && mappedListener) {
        query.removeListener(mappedListener);
      }
      appearanceListeners.delete(listener);
      listenerMapping.delete(listener);
    }

    return { remove };
  }
};

export default Appearance;
