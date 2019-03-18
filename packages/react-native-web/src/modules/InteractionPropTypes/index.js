/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { oneOf, string } from 'prop-types';

const InteractionPropTypes = {
  cursor: string,
  touchAction: oneOf([
    'auto',
    'inherit',
    'manipulation',
    'none',
    'pan-down',
    'pan-left',
    'pan-right',
    'pan-up',
    'pan-x',
    'pan-y',
    'pinch-zoom'
  ]),
  userSelect: string,
  willChange: string
};

export default InteractionPropTypes;
