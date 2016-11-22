/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

module.exports = process.env.NODE_ENV !== 'production' ? function StyleSheetPropType(shape) {
  const createStrictShapeTypeChecker = require('./createStrictShapeTypeChecker');
  const flattenStyle = require('../modules/flattenStyle');

  const shapePropType = createStrictShapeTypeChecker(shape);
  return function (props, propName, componentName, location?) {
    let newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      newProps[propName] = flattenStyle(props[propName]);
    }
    return shapePropType(newProps, propName, componentName, location);
  };
} : function () {};
