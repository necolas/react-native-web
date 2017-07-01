/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default 'html{' + // css reset
  'font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;' +
  '-webkit-tap-highlight-color:rgba(0,0,0,0);' +
  '}\n' +
  'body{margin:0;}\n' +
  'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}\n' +
  'input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,' +
  'input::-webkit-search-cancel-button,input::-webkit-search-decoration,' +
  'input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}\n' +
  '@keyframes rn-ActivityIndicator-animation{' +
  '0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}' +
  '100%{-webkit-transform:rotate(360deg);transform:rotate(360deg);}' +
  '}\n' +
  '@keyframes rn-ProgressBar-animation{' +
  '0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);}' +
  '100%{-webkit-transform:translateX(400%);transform:translateX(400%);}' +
  '}';
