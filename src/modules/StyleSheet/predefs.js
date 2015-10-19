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
._s_pe-a, ._s_pe-bo, ._s_pe-bn * {pointer-events:auto}
._s_pe-n, ._s_pe-bo *, ._s_pe-bn {pointer-events:none}`

export const predefinedClassNames = {
  'pointerEvents:auto': '_s_pe-a',
  'pointerEvents:box-none': '_s_pe-bn',
  'pointerEvents:box-only': '_s_pe-bo',
  'pointerEvents:none': '_s_pe-n'
}
