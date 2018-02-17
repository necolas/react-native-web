/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import NativeMethodsMixin from '../NativeMethodsMixin';

const applyNativeMethods = Component => {
  Object.keys(NativeMethodsMixin).forEach(method => {
    if (!Component.prototype[method]) {
      Component.prototype[method] = NativeMethodsMixin[method];
    }
  });
  return Component;
};

export default applyNativeMethods;
