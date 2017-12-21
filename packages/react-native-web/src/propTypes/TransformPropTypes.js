/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule TransformPropTypes
 * @flow
 */

import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
const numberOrString = oneOfType([number, string]);

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
  transformOrigin: string
};

export default TransformPropTypes;
