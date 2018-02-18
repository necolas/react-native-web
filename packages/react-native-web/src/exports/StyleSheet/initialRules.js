/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// Prevent browsers throwing parse errors, e.g., on vendor-prefixed pseudo-elements
const safeRule = rule => `@media all{\n${rule}\n}`;

const resets = [
  // minimal top-level reset
  'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}',
  'body{margin:0;}',
  // minimal form pseudo-element reset
  'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}',
  'input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,' +
    'input::-webkit-search-cancel-button,input::-webkit-search-decoration,' +
    'input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'
];

const reset = [safeRule(resets.join('\n'))];

export default reset;
