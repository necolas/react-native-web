/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { arrayOf, number, oneOf, oneOfType, shape, string } from 'prop-types';
const numberOrString = oneOfType([number, string]);

const TransformPropTypes = {
  perspective: oneOfType([number, string]),
  perspectiveOrigin: string,
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
  transformOrigin: string,
  transformStyle: oneOf(['flat', 'preserve-3d'])
};

export default TransformPropTypes;
