/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @see https://github.com/react/react/blob/v19.3.0/packages/react-dom-bindings/src/shared/isUnitlessNumber.js
 */

const properties = [
  'animationIterationCount',
  'aspectRatio',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridArea',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
  'initialLetter',
  'lineClamp',
  'opacity',
  'order',
  'orphans',
  'scale',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',

  // SVG-related properties
  'fillOpacity',
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',

  // RN-related
  'scaleX',
  'scaleY',
  'scaleZ',
  'shadowOpacity'
];

const unitlessNumbers: Set<string> = new Set(properties);

// Support style names prefixed with 'Webkit' (e.g. 'WebkitLineClamp')
for (const prop of properties) {
  unitlessNumbers.add('Webkit' + prop.charAt(0).toUpperCase() + prop.slice(1));
}

export default function isUnitlessNumber(name: string): boolean {
  return unitlessNumbers.has(name);
}
