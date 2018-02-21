/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { arrayOf, number, object, oneOf, oneOfType, string } from 'prop-types';

const AnimationPropTypes = {
  animationDelay: string,
  animationDirection: oneOf(['alternate', 'alternate-reverse', 'normal', 'reverse']),
  animationDuration: string,
  animationFillMode: oneOf(['none', 'forwards', 'backwards', 'both']),
  animationIterationCount: oneOfType([number, oneOf(['infinite'])]),
  animationName: oneOfType([string, arrayOf(oneOfType([string, object]))]),
  animationPlayState: oneOf(['paused', 'running']),
  animationTimingFunction: string,
  transitionDelay: string,
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string
};

export default AnimationPropTypes;
