/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

function StyleSheetPropType(shape: { [key: string]: ReactPropsCheckType }): ReactPropsCheckType {
  const createStrictShapeTypeChecker = require('./createStrictShapeTypeChecker');
  const StyleSheet = require('../apis/StyleSheet');

  const shapePropType = createStrictShapeTypeChecker(shape);
  return function(props, propName, componentName, location?, ...rest) {
    let newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      newProps[propName] = StyleSheet.flatten(props[propName]);
    }
    return shapePropType(newProps, propName, componentName, location, ...rest);
  };
}

module.exports = StyleSheetPropType;
