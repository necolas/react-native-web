/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import PixelRatio from '../PixelRatio';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import flattenStyle from './flattenStyle';

const absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
const absoluteFill = ReactNativePropRegistry.register(absoluteFillObject);

let hairlineWidth = PixelRatio.roundToNearestPixel(0.4);
if (hairlineWidth === 0) {
  hairlineWidth = 1 / PixelRatio.get();
}

const StyleSheet = {
  absoluteFill,
  absoluteFillObject,
  compose(style1: any, style2: any) {
    if (process.env.NODE_ENV !== 'production') {
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
    const result = {};
    Object.keys(styles).forEach(key => {
      if (process.env.NODE_ENV !== 'production') {
        const validate = require('./validate');
        const interopValidate = validate.default ? validate.default : validate;
        interopValidate(key, styles);
      }
      const id = styles[key] && ReactNativePropRegistry.register(styles[key]);
      result[key] = id;
    });
    return result;
  },
  flatten: flattenStyle,
  hairlineWidth
};

export default StyleSheet;
