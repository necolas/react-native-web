# Client-side rendering

Render apps using `AppRegistry`:

```js
// index.web.js

import App from './src/App';
import React from 'react';
import { AppRegistry } from 'react-native';

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
});
```

Or render individual components:

```js
import AppHeader from './src/AppHeader';
import React from 'react';
import { render } from 'react-native';

render(<AppHeader />, document.getElementById('react-app-header'))
```

(Components will also be rendered within a tree produced by calling
`ReactDOM.render` (i.e., an existing web app), but
otherwise it is not recommended.)

You might need to adjust the styles of the HTML document's root elements for
your app to fill the viewport.

```html
<html style="height:100%">
<body style="height:100%">
<div id="react-root" style="display:flex;height:100%"></div>
```
