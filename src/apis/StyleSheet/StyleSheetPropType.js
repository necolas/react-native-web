/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import createStrictShapeTypeChecker from './createStrictShapeTypeChecker'
import flattenStyle from './flattenStyle'

module.exports = function StyleSheetPropType(shape) {
  const shapePropType = createStrictShapeTypeChecker(shape)
  return function (props, propName, componentName, location?) {
    let newProps = props
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {}
      newProps[propName] = flattenStyle(props[propName])
    }
    return shapePropType(newProps, propName, componentName, location)
  }
}
