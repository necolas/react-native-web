/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import { PropTypes } from 'react'

const { arrayOf, number, oneOfType, shape, string } = PropTypes
const ArrayOfNumberPropType = arrayOf(number)
const numberOrString = oneOfType([ number, string ])

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
  transform: arrayOf(
    oneOfType([
      shape({ perspective: numberOrString }),
      shape({ rotate: string }),
      shape({ rotateX: string }),
      shape({ rotateY: string }),
      shape({ rotateZ: string }),
      shape({ scale: number }),
      shape({ scaleX: number }),
      shape({ scaleY: number }),
      shape({ skewX: string }),
      shape({ skewY: string }),
      shape({ translateX: numberOrString }),
      shape({ translateY: numberOrString }),
      shape({ translateZ: numberOrString }),
      shape({ translate3d: string })
    ])
  ),
  transformMatrix: TransformMatrixPropType
}

module.exports = TransformPropTypes
