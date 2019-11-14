/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import warning from 'fbjs/lib/warning';

const invalidShortforms = {
  background: true,
  borderBottom: true,
  borderLeft: true,
  borderRight: true,
  borderTop: true,
  font: true,
  grid: true,
  outline: true,
  textDecoration: true
};

function error(message) {
  warning(false, message);
}

export default function validate(key: string, styles: Object) {
  const obj = styles[key];
  for (const k in obj) {
    const prop = k.trim();
    const value = obj[prop];
    let isInvalid = false;

    if (value === null) {
      continue;
    }

    if (typeof value === 'string' && value.indexOf('!important') > -1) {
      error(`Invalid style declaration "${prop}:${value}". Values cannot include "!important"`);
      isInvalid = true;
    } else {
      let suggestion = '';
      if (prop === 'animation' || prop === 'animationName') {
        suggestion = 'Did you mean "animationKeyframes"?';
        // } else if (prop === 'boxShadow') {
        //  suggestion = 'Did you mean "shadow{Color,Offset,Opacity,Radius}"?';
        isInvalid = true;
      } else if (prop === 'direction') {
        suggestion = 'Did you mean "writingDirection"?';
        isInvalid = true;
      } else if (prop === 'verticalAlign') {
        suggestion = 'Did you mean "textAlignVertical"?';
        isInvalid = true;
      } else if (invalidShortforms[prop]) {
        suggestion = 'Please use long-form properties.';
        isInvalid = true;
      }
      if (suggestion !== '') {
        error(`Invalid style property of "${prop}". ${suggestion}`);
      }
    }

    if (isInvalid) {
      delete obj[k];
    }
  }
}
