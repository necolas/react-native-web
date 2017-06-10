/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
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
