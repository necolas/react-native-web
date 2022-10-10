---
title: Appearance
date: Last Modified
permalink: /docs/appearance/index.html
eleventyNavigation:
  key: Appearance
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
The Appearance module exposes information about the user's appearance preferences, such as their preferred color scheme (light or dark).
:::

```js
import { Appearance } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('addChangeListener', '(listener) => { remove: () => void }') %}
Add an event handler that is called with `{colorScheme: "dark" | "light"}` when appearance preferences change. Returns a `remove` method used to remove the change listener.
{% endcall %}

{% call macro.prop('getColorScheme', '() => ("dark" | "light")') %}
You can use the Appearance module to determine if the user prefers a dark color scheme. Although the color scheme is available immediately, this may change (e.g. scheduled color scheme change at sunrise or sunset). Any rendering logic or styles that depend on the user preferred color scheme should try to call this function on every render, rather than caching the value.
{% endcall %}
