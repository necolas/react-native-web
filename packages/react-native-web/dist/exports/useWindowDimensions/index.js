/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

import Dimensions from '../Dimensions';
import { useEffect, useState } from 'react';
export default function useWindowDimensions() {
  var _useState = useState(function () {
    return Dimensions.get('window');
  }),
      dims = _useState[0],
      setDims = _useState[1];

  useEffect(function () {
    function handleChange(_ref) {
      var window = _ref.window;

      if (window != null) {
        setDims(window);
      }
    }

    Dimensions.addEventListener('change', handleChange); // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.

    setDims(Dimensions.get('window'));
    return function () {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);
  return dims;
}