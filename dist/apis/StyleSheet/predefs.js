'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Reset unwanted styles beyond the control of React inline styles
 */
var resetCSS = exports.resetCSS = '/* React Native for Web */\nhtml {font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}\nbody {margin:0}\nbutton::-moz-focus-inner, input::-moz-focus-inner {border:0;padding:0}\ninput[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {display:none}';

/**
 * Custom pointer event styles
 */
var predefinedCSS = exports.predefinedCSS = '/* pointer-events */\n.__style_pea, .__style_pebo, .__style_pebn * {pointer-events:auto}\n.__style_pen, .__style_pebo *, .__style_pebn {pointer-events:none}';

var predefinedClassNames = exports.predefinedClassNames = {
  'pointerEvents:auto': '__style_pea',
  'pointerEvents:box-none': '__style_pebn',
  'pointerEvents:box-only': '__style_pebo',
  'pointerEvents:none': '__style_pen'
};