---
title: Clipboard
date: Last Modified
permalink: /docs/clipboard/index.html
eleventyNavigation:
  key: Clipboard
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Clipboard gives you an interface for setting to the clipboard. (Getting clipboard content is not currently supported on web.)
:::

```js
import { Clipboard } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('isAvailable', '() => boolean') %}
Determines whether the browser environment supports Clipboard at all.
{% endcall %}

{% call macro.prop('setString', '(text: string) => void') %}
Copies a string to the clipboard. This method does not return a value.
{% endcall %}

{% call macro.prop('getString', '() => Promise<"">') %}
Not properly supported on Web. Returns a Promise of an empty string.
{% endcall %}

---

## Examples

{{ macro.codesandbox('clipboard') }}
