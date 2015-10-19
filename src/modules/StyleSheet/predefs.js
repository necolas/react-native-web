/**
 * Reset unwanted styles beyond the control of React inline styles
 */
export const resetCSS =
`/* React Native Web */
html {font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}
body {margin:0}
button::-moz-focus-inner, input::-moz-focus-inner {border:0;padding:0}
input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {-webkit-appearance:none}`

/**
 * Custom pointer event styles
 */
export const predefinedCSS =
`/* pointer-events */
._rn_pe-a, ._rn_pe-bo, ._rn_pe-bn * {pointer-events:auto}
._rn_pe-n, ._rn_pe-bo *, ._rn_pe-bn {pointer-events:none}`

export const predefinedClassNames = {
  'pointerEvents:auto': '_rn_pe-a',
  'pointerEvents:box-none': '_rn_pe-bn',
  'pointerEvents:box-only': '_rn_pe-bo',
  'pointerEvents:none': '_rn_pe-n'
}
