/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import Appearance from '../Appearance';
export default function useColorScheme() {
  var _React$useState = React.useState(Appearance.getColorScheme()),
      colorScheme = _React$useState[0],
      setColorScheme = _React$useState[1];

  React.useEffect(function () {
    function listener(appearance) {
      setColorScheme(appearance.colorScheme);
    }

    Appearance.addChangeListener(listener);
    return function () {
      return Appearance.removeChangeListener(listener);
    };
  });
  return colorScheme;
}