/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import flattenStyle from './flattenStyle';

const isDev = process.env.NODE_ENV !== 'production';

const absoluteFill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

if (isDev) {
  Object.freeze(absoluteFill);
}

const StyleSheet = {
  absoluteFill,
  absoluteFillObject: absoluteFill,
  compose(style1: any, style2: any) {
    if (isDev) {
      /* eslint-disable prefer-rest-params */
      const len = arguments.length;
      if (len > 2) {
        const readableStyles = [...arguments].map(a => flattenStyle(a));
        throw new Error(
          `StyleSheet.compose() only accepts 2 arguments, received ${len}: ${JSON.stringify(
            readableStyles
          )}`
        );
      }
      /* eslint-enable prefer-rest-params */
    }

    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create(styles: Object) {
    if (process.env.NODE_ENV !== 'production') {
      Object.keys(styles).forEach(key => {
        const validate = require('./validate');
        const interopValidate = validate.default ? validate.default : validate;
        interopValidate(key, styles);

        if (styles[key]) {
          Object.freeze(styles[key]);
        }
      });
    }

    return styles;
  },
  flatten: flattenStyle,
  hairlineWidth: 1
};

export default StyleSheet;
