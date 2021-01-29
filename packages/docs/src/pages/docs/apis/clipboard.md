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

{% call macro.prop('setString', '() => boolean') %}
Copies a string to the clipboard. On web, some browsers may not support copying to the clipboard, therefore, this function returns a boolean to indicate if the copy was successful.
{% endcall %}

{% call macro.prop('getString', '() => Promise<"">') %}
Not properly supported on Web. Returns a Promise of an empty string.
{% endcall %}
