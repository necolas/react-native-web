---
title: Dimensions
date: Last Modified
permalink: /docs/dimensions/index.html
eleventyNavigation:
  key: Dimensions
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Respond to changes in the viewport dimensions.
:::

Dimensions may change (e.g., due to device rotation) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value.

```js
import { Dimensions } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('get', '(string: "window" | "screen") => Dimension') %}
Get a dimension (e.g., window or screen).
{% endcall %}

{% call macro.prop('set', '(dimensions: { window: Dimension, screen: Dimension }) => void') %}
This should only be called server-side with an estimate for initial dimensions to be used when pre-rendering pages on the server.
{% endcall %}

{% call macro.prop('addEventListener', '(type: ?string, listener: (dimensions) => void) => void') %}
Add a listener to `Dimensions` changes. Listen to the `"change"` event type. The handler is called with the dimensions state.
{% endcall %}

{% call macro.prop('removeEventListener', '(type: ?string, listener: (dimensions) => void) => void') %}
Remove a listener from `Dimensions` changes.
{% endcall %}

### Dimension

{% call macro.prop('height', 'number') %}
The height of the dimension.
{% endcall %}

{% call macro.prop('width', 'number') %}
The width of the dimension.
{% endcall %}
