---
title: Linking
date: Last Modified
permalink: /docs/linking/index.html
eleventyNavigation:
  key: Linking
  parent: APIs
  label: "Change"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Linking gives you a general interface for securely opening external URLs from JavaScript.
:::

```js
import { Linking } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('canOpenURL', '(url) => Promise<boolean>') %}
Returns a `Promise` that resolves to a boolean indicating whether the app can open the URL.
{% endcall %}

{% call macro.prop('getInitialURL', '() => Promise<string>') %}
Returns a `Promise` that resolves to the string of the URL that initially loaded the app.
{% endcall %}

{% call macro.prop('openURL', '(url) => Promise<>') %}
Try to open the given url in a secure fashion. The method returns a Promise object. If the url opens, the promise is resolved. If not, the promise is rejected.
{% endcall %}

---

## Examples

{{ macro.codesandbox('linking') }}
