/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StyleSheet
 * @noflow
 */

import flattenStyle from './flattenStyle';
import getHairlineWidth from './getHairlineWidth';
import modality from '../../modules/modality';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import styleResolver from './styleResolver';

// initialize focus-ring fix
modality();

// allow component styles to be editable in React Dev Tools
if (process.env.NODE_ENV !== 'production') {
  const { canUseDOM } = require('fbjs/lib/ExecutionEnvironment');
  if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = flattenStyle;
  }
}

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
  compose(style1, style2) {
    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
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
  getStyleSheets() {
    return styleResolver.getStyleSheets();
  },
  hairlineWidth: getHairlineWidth()
};

export default StyleSheet;
