/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import createStrictShapeTypeChecker from '../../modules/createStrictShapeTypeChecker';
import { number } from 'prop-types';

export type EdgeInsetsProp = {
  top: number,
  left: number,
  bottom: number,
  right: number
};

const EdgeInsetsPropType = createStrictShapeTypeChecker({
  top: number,
  left: number,
  bottom: number,
  right: number
});

export default EdgeInsetsPropType;
