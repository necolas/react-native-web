/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { arrayOf, number, object, oneOf, oneOfType, string } from 'prop-types';

const animationDirectionEnum = ['alternate', 'alternate-reverse', 'normal', 'reverse'];
const animationFillModeEnum = ['none', 'forwards', 'backwards', 'both'];
const animationPlayStateEnum = ['paused', 'running'];

const AnimationPropTypes = {
  animationDelay: oneOfType([string, arrayOf(string)]),
  animationDirection: oneOfType([oneOf(animationDirectionEnum), arrayOf(animationDirectionEnum)]),
  animationDuration: oneOfType([string, arrayOf(string)]),
  animationFillMode: oneOfType([oneOf(animationFillModeEnum), arrayOf(animationFillModeEnum)]),
  animationIterationCount: oneOfType([
    number,
    oneOf(['infinite']),
    arrayOf(oneOfType([number, oneOf(['infinite'])]))
  ]),
  animationKeyframes: oneOfType([string, object, arrayOf(oneOfType([string, object]))]),
  animationPlayState: oneOfType([oneOf(animationPlayStateEnum), arrayOf(animationPlayStateEnum)]),
  animationTimingFunction: oneOfType([string, arrayOf(string)]),
  transitionDelay: oneOfType([string, arrayOf(string)]),
  transitionDuration: oneOfType([string, arrayOf(string)]),
  transitionProperty: oneOfType([string, arrayOf(string)]),
  transitionTimingFunction: oneOfType([string, arrayOf(string)])
};

export default AnimationPropTypes;
