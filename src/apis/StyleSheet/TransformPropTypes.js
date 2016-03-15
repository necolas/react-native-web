/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import { PropTypes } from 'react'

const ArrayOfNumberPropType = PropTypes.arrayOf(PropTypes.number)
const numberOrString = PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])

const TransformMatrixPropType = function (
  props : Object,
  propName : string,
  componentName : string
) : ?Error {
  if (props.transform && props.transformMatrix) {
    return new Error(
      'transformMatrix and transform styles cannot be used on the same ' +
      'component'
    )
  }
  return ArrayOfNumberPropType(props, propName, componentName)
}

const TransformPropTypes = {
  transform: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ perspective: numberOrString }),
      PropTypes.shape({ rotate: numberOrString }),
      PropTypes.shape({ rotateX: numberOrString }),
      PropTypes.shape({ rotateY: numberOrString }),
      PropTypes.shape({ rotateZ: numberOrString }),
      PropTypes.shape({ scale: numberOrString }),
      PropTypes.shape({ scaleX: numberOrString }),
      PropTypes.shape({ scaleY: numberOrString }),
      PropTypes.shape({ skewX: numberOrString }),
      PropTypes.shape({ skewY: numberOrString }),
      PropTypes.shape({ translateX: numberOrString }),
      PropTypes.shape({ translateY: numberOrString })
    ])
  ),
  transformMatrix: TransformMatrixPropType
}

module.exports = TransformPropTypes
