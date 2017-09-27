/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ColorPropType
 * @flow
 */

const isWebColor = (color: string) =>
  color === 'currentcolor' || color === 'inherit' || color.indexOf('var(') === 0;

const colorPropType = function(isRequired, props, propName, componentName, location, propFullName) {
  const normalizeColor = require('normalize-css-color');
  const color = props[propName];
  if (color === undefined || color === null) {
    if (isRequired) {
      return new Error(
        'Required ' +
          location +
          ' `' +
          (propFullName || propName) +
          '` was not specified in `' +
          componentName +
          '`.'
      );
    }
    return;
  }

  if (typeof color === 'number') {
    // Developers should not use a number, but we are using the prop type
    // both for user provided colors and for transformed ones. This isn't ideal
    // and should be fixed but will do for now...
    return;
  }

  if (typeof color === 'string' && isWebColor(color)) {
    // Web supports additional color keywords and custom property values. Ignore them.
    return;
  }

  if (normalizeColor(color) === null) {
    return new Error(
      'Invalid ' +
        location +
        ' `' +
        (propFullName || propName) +
        '` supplied to `' +
        componentName +
        '`: ' +
        color +
        '\n' +
        `Valid color formats are
  - '#f0f' (#rgb)
  - '#f0fc' (#rgba)
  - '#ff00ff' (#rrggbb)
  - '#ff00ff00' (#rrggbbaa)
  - 'rgb(255, 255, 255)'
  - 'rgba(255, 255, 255, 1.0)'
  - 'hsl(360, 100%, 100%)'
  - 'hsla(360, 100%, 100%, 1.0)'
  - 'transparent'
  - 'red'
  - 0xff00ff00 (0xrrggbbaa)
`
    );
  }
};

let ColorPropType;

if (process.env.NODE_ENV !== 'production') {
  ColorPropType = colorPropType.bind(null, false /* isRequired */);
  ColorPropType.isRequired = colorPropType.bind(null, true /* isRequired */);
} else {
  ColorPropType = function() {};
}

export default ColorPropType;
