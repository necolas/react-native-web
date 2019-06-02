/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { oneOf, oneOfType, string } from 'prop-types';

const cursorEnum = [
  'auto',
  'default',
  'none',
  'context-menu',
  'help',
  'pointer',
  'progress',
  'wait',
  'cell',
  'crosshair',
  'text',
  'vertical-text',
  'alias',
  'copy',
  'move',
  'no-drop',
  'not-allowed',
  'e-resize',
  'n-resize',
  'ne-resize',
  'nw-resize',
  's-resize',
  'se-resize',
  'sw-resize',
  'w-resize',
  'ew-resize',
  'ns-resize',
  'nesw-resize',
  'nwse-resize',
  'col-resize',
  'row-resize',
  'all-scroll',
  'zoom-in',
  'zoom-out',
  'grab',
  'grabbing '
];
const touchActionEnum = [
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
];
const userSelectEnum = ['auto', 'text', 'none', 'contain', 'all'];

const InteractionPropTypes = {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Formal_syntax
  cursor: oneOfType([string, oneOf(cursorEnum)]),
  // https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#Formal_syntax
  touchAction: oneOf(touchActionEnum),
  // https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#Formal_syntax_2
  userSelect: oneOf(userSelectEnum),
  willChange: string
};

export default InteractionPropTypes;
