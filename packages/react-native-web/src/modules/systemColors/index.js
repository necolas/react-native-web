/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/system-color
const systemColors: Set<string> = new Set([
  'activetext',
  'buttonface',
  'buttontext',
  'canvas',
  'canvastext',
  'field',
  'fieldtext',
  'graytext',
  'highlight',
  'highlighttext',
  'linktext',
  'visitedtext'
]);

// Not supported by every build target (Chrome 96, Firefox 94, Safari 15.1), so they
// are used through CSS custom properties defined only when the browser supports them.
const newSystemColors: Set<string> = new Set([
  'accentcolor', // Chrome 149, Firefox 103, Safari 16.5
  'accentcolortext', // Chrome 149, Firefox 103, Safari 16.5
  'buttonborder', // Chrome 101, Firefox 109, Safari 16.4
  'mark', // Chrome 102, Firefox 109, Safari 16.4
  'marktext', // Chrome 102, Firefox 109, Safari 16.4
  'selecteditem', // Chrome 103, Firefox 93, Safari 16.4
  'selecteditemtext' // Chrome 103, Firefox 93, Safari 16.4
]);

export const systemColorRules: Array<string> = Array.from(
  newSystemColors,
  (name) => `@supports (color:${name}){:root{--rnw-${name}:${name};}}`
);

/**
 * Returns the CSS value to use for a system color, or null if the color is not
 * a system color. The fallback is used by newer system colors only.
 */
export function getSystemColor(color: string, fallback?: ?string): ?string {
  const name = color.toLowerCase();
  if (systemColors.has(name)) {
    return color;
  }
  if (newSystemColors.has(name)) {
    return fallback == null
      ? `var(--rnw-${name})`
      : `var(--rnw-${name}, ${fallback})`;
  }
  return null;
}
