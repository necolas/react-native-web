/**
 * Reset unwanted styles beyond the control of React inline styles
 */
export const resetCSS =
`/* React Native for Web */
html {font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}
body {margin:0}
button::-moz-focus-inner, input::-moz-focus-inner {border:0;padding:0}
input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {display:none}`

/**
 * Custom pointer event styles
 */
export const predefinedCSS =
`/* pointer-events */
.__style_pea, .__style_pebo, .__style_pebn * {pointer-events:auto}
.__style_pen, .__style_pebo *, .__style_pebn {pointer-events:none}`

export const predefinedClassNames = {
  'pointerEvents:auto': '__style_pea',
  'pointerEvents:box-none': '__style_pebn',
  'pointerEvents:box-only': '__style_pebo',
  'pointerEvents:none': '__style_pen'
}
