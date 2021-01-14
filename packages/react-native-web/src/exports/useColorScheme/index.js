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
import type { ColorSchemeName } from '../Appearance';
import Appearance from '../Appearance';

export default function useColorScheme(): ColorSchemeName {
  const [colorScheme, setColorScheme] = React.useState(Appearance.getColorScheme());

  React.useEffect(() => {
    function listener(appearance) {
      setColorScheme(appearance.colorScheme);
    }
    Appearance.addChangeListener(listener);
    return () => Appearance.removeChangeListener(listener);
  });

  return colorScheme;
}
