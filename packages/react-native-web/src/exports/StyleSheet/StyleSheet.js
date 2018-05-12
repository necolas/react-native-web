/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import flattenStyle from './flattenStyle';
import getHairlineWidth from './getHairlineWidth';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';

const absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
const absoluteFill = ReactNativePropRegistry.register(absoluteFillObject);

const StyleSheet = {
  absoluteFill,
  absoluteFillObject,
  compose(...styles) {
    const _styles = styles.filter(Boolean);
    return _styles.length > 1 ? _styles : _styles[0];
  },
  create(styles) {
    const result = {};
    Object.keys(styles).forEach(key => {
      if (process.env.NODE_ENV !== 'production') {
        const StyleSheetValidation = require('./StyleSheetValidation').default;
        StyleSheetValidation.validateStyle(key, styles);
      }
      const id = styles[key] && ReactNativePropRegistry.register(styles[key]);
      result[key] = id;
    });
    return result;
  },
  flatten: flattenStyle,
  hairlineWidth: getHairlineWidth()
};

export default StyleSheet;
