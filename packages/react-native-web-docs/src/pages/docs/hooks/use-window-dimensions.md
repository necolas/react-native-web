---
title: useWindowDimensions
date: Last Modified
permalink: /docs/use-window-dimensions/index.html
eleventyNavigation:
  key: useWindowDimensions 
  parent: Hooks
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Respond to window size changes from the `Dimensions` module.
:::

`useWindowDimensions` automatically updates `width` and `height` values when viewport size changes.

```js
import { useWindowDimensions } from 'react-native';
const { height, scale, width } = useWindowDimensions();
```

---

## API

### Return value

`useWindowDimensions` returns the `window` dimension object.

{% call macro.prop('height', 'number') %}
The height in pixels of the app viewport.
{% endcall %}

{% call macro.prop('scale', 'number') %}
The pixel ratio of the device your app is running on.
{% endcall %}

{% call macro.prop('width', 'number') %}
The width in pixels of the app viewport.
{% endcall %}
