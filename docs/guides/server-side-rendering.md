# Server-side rendering

Server-side rendering to HTML is supported using `AppRegistry`:

```js
import App from './src/App';
import ReactDOMServer from 'react-dom/server';
import { AppRegistry } from 'react-native-web';

// register the app
AppRegistry.registerComponent('App', () => App);

// prerender the app
const { element, getStyleElement } = AppRegistry.getApplication('App', { initialProps });
// first the element
const html = ReactDOMServer.renderToString(element);
// then the styles (optionally include a nonce if your CSP policy requires it)
const css = ReactDOMServer.renderToStaticMarkup(getStyleElement({ nonce }));

// example HTML document string
const document = `
<!DOCTYPE html>
<html style="height:100%">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${css}
<body style="height:100%; overflow-y:hidden">
<div id="root" style="display:flex; height: 100%">
${html}
</div>
<script nonce="${nonce}" src="${bundlePath}"></script>
`
```
