/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import mergeRefs from '../mergeRefs';
export default function useMergeRefs() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return React.useMemo(function () {
    return mergeRefs.apply(void 0, args);
  }, // eslint-disable-next-line
  [].concat(args));
}