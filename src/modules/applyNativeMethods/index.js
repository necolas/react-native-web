/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import NativeMethodsMixin from '../NativeMethodsMixin';

const applyNativeMethods = (Component: ReactClass<any>) => {
  Object.keys(NativeMethodsMixin).forEach(method => {
    if (!Component.prototype[method]) {
      Component.prototype[method] = NativeMethodsMixin[method];
    }
  });
  return Component;
};

export default applyNativeMethods;
