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

import * as React from 'react';
import type { ColorSchemeName } from '../Appearance';
import Appearance from '../Appearance';

function subscribe(callback: () => void): () => void {
  return Appearance.addChangeListener(callback).remove;
}

function getServerSnapshot(): ColorSchemeName {
  return 'light';
}

export default function useColorScheme(): ColorSchemeName {
  return React.useSyncExternalStore(
    subscribe,
    Appearance.getColorScheme,
    getServerSnapshot
  );
}
