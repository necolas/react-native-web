'use strict';

import React from 'react';

const __DEV__ = process.env.NODE_ENV !== 'production';

function cloneReferencedElement(element, config, ...children) {
  let cloneRef = config.ref;
  let originalRef = element.ref;
  if (originalRef == null || cloneRef == null) {
    return React.cloneElement(element, config, ...children);
  }

  if (typeof originalRef !== 'function') {
    if (__DEV__) {
      console.warn(
        'Cloning an element with a ref that will be overwritten because it ' +
        'is not a function. Use a composable callback-style ref instead. ' +
        'Ignoring ref: ' + originalRef,
      );
    }
    return React.cloneElement(element, config, ...children);
  }

  return React.cloneElement(element, {
    ...config,
    ref(component) {
      cloneRef(component);
      originalRef(component);
    },
  }, ...children);
}

export default cloneReferencedElement;
