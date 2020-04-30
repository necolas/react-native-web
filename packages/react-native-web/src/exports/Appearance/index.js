/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type ColorSchemeName = 'light' | 'dark';

export type AppearancePreferences = {|
  colorScheme?: ?ColorSchemeName
|};

type AppearanceListener = (preferences: AppearancePreferences) => void;
type DomAppearanceListener = (ev: MediaQueryListEvent) => any;

function getQuery(): MediaQueryList | null {
  if (typeof window === 'undefined' || !window.matchMedia) return null;
  return window.matchMedia('(prefers-color-scheme: dark)');
}

const query = getQuery();
const listenerMapping = new WeakMap<AppearanceListener, DomAppearanceListener>();

module.exports = {
  getColorScheme(): ColorSchemeName {
    if (query && query.matches) return 'dark';
    return 'light';
  },

  addChangeListener(listener: AppearanceListener): void {
    let mappedListener = listenerMapping.get(listener);
    if (!mappedListener) {
      mappedListener = ({ matches }: MediaQueryListEvent) => {
        listener({ colorScheme: matches ? 'dark' : 'light' });
      };
      listenerMapping.set(listener, mappedListener);
    }
    if (query) query.addListener(mappedListener);
  },

  removeChangeListener(listener: AppearanceListener): void {
    const mappedListener = listenerMapping.get(listener);
    if (mappedListener) {
      if (query) query.removeListener(mappedListener);
      listenerMapping.delete(listener);
    }
  }
};
