/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StyleSheetPropType
 * @flow
 */

function StyleSheetPropType(shape: { [key: string]: ReactPropsCheckType }): ReactPropsCheckType {
  const createStrictShapeTypeChecker = require('./createStrictShapeTypeChecker').default;
  const StyleSheet = require('../apis/StyleSheet').default;

  const shapePropType = createStrictShapeTypeChecker(shape);
  return function(props, propName, componentName, location?, ...rest) {
    let newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      const flatStyle = StyleSheet.flatten(props[propName]);
      // Remove custom properties from check
      const nextStyle = Object.keys(flatStyle).reduce((acc, curr) => {
        if (curr.indexOf('--') !== 0) {
          acc[curr] = flatStyle[curr];
        }
        return acc;
      }, {});
      newProps[propName] = nextStyle;
    }
    return shapePropType(newProps, propName, componentName, location, ...rest);
  };
}

export default StyleSheetPropType;
