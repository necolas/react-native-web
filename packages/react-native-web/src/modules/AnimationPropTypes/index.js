/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { arrayOf, number, object, oneOf, oneOfType, shape, string } from 'prop-types';
const numberOrString = oneOfType([number, string]);

const AnimationPropTypes = {
  animation: arrayOf(
    shape({
      animationName: oneOfType([string, arrayOf(oneOfType([string, object]))]),
      animationDuration: string,
      animationTimingFunction: string,
      animationDelay: string,
      animationDirection: oneOf(['alternate', 'alternate-reverse', 'normal', 'reverse']),
      animationIterationCount: numberOrString,
      animationFillMode: oneOf(['none', 'forwards', 'backwards', 'both']),
      animationPlayState: oneOf(['paused', 'running'])
    })
  ),
  transitionDelay: string,
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string
};

export default AnimationPropTypes;
