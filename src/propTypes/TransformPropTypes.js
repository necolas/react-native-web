/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import { PropTypes } from 'react';

const { arrayOf, number, oneOfType, shape, string } = PropTypes;
const numberOrString = oneOfType([ number, string ]);

const TransformPropTypes = process.env.NODE_ENV !== 'production' ? {
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
  transformOrigin: string
} : {};

module.exports = TransformPropTypes;
