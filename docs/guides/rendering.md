# Client and Server rendering

## Client-side rendering

```js
// client.js

import React, { AppRegistry } from 'react-native'
import MyApp from './MyApp'

// register the app
AppRegistry.registerApp('MyApp', () => MyApp)

// mount the app within the `rootTag` and run it
AppRegistry.runApplication('MyApp', { initialProps, rootTag: document.getElementById('react-root') })

// DOM render
React.render(<div />, document.getElementById('sidebar-app'))

// Server render
React.renderToString(<div />)
```

## Server-side rendering

Pre-rendering React apps on the server is a key feature for Web applications.
React Native for Web extends `AppRegistry` to provide support for server-side
rendering.

```js
// server.js

import React, { AppRegistry } from 'react-native'
import MyApp from './MyApp'

// register the app
AppRegistry.registerApp('MyApp', () => MyApp)

// prerender the app
const { html, style } = AppRegistry.prerenderApplication('MyApp', { initialProps })

// construct full page markup
const HtmlShell = (html, style) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
      {style}
    </head>
    <body>
      <div id="react-root" dangerouslySetInnerHTML={{ __html: html }} />
    </body>
  </html>
)

React.renderToStaticMarkup(<HtmlShell html={html} style={style} />)
```
