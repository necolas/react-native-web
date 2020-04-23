/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import * as React from 'react';

export type ColorSchemeName = 'light' | 'dark' | 'no-preference';

function getQuery(): MediaQueryList | null {
  if (typeof window === 'undefined' || !window.matchMedia) return null;
  return window.matchMedia('(prefers-color-scheme: dark)');
}

const query = getQuery();

export function getColorScheme(): ColorSchemeName {
  return query && query.matches ? 'dark' : 'light';
}

export function useColorScheme(): ColorSchemeName {
  const [colorScheme, setColorScheme] = React.useState(getColorScheme());

  React.useEffect(() => {
    function listener({ matches }: MediaQueryListEvent) {
      setColorScheme(matches ? 'dark' : 'light');
    }

    if (query) query.addListener(listener);

    return () => {
      if (query) {
        query.removeListener(listener);
      }
    };
  });

  return colorScheme;
}
