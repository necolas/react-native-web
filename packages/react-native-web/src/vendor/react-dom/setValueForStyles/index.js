/* eslint-disable */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * From React 16.3.0
 * @noflow
 */

import dangerousStyleValue from '../dangerousStyleValue';
import hyphenateStyleName from 'hyphenate-style-name';
import warnValidStyle from '../warnValidStyle';

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */
function setValueForStyles(node, styles, getStack) {
  const style = node.style;
  for (let styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    const isCustomProperty = styleName.indexOf('--') === 0;
    if (process.env.NODE_ENV !== 'production') {
      if (!isCustomProperty) {
        warnValidStyle(styleName, styles[styleName], getStack);
      }
    }
    const styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    if (isCustomProperty) {
      const name = isCustomProperty ? styleName : hyphenateStyleName(styleName);
      style.setProperty(name, styleValue);
    } else {
      style[styleName] = styleValue;
    }
  }
}

export default setValueForStyles;
