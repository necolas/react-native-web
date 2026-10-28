---
title: PlatformColor
date: Last Modified
permalink: /docs/platform-color/index.html
eleventyNavigation:
  key: PlatformColor
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Use colors defined by the platform. On web, these are the [CSS system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/system-color).
:::

The browser uses the first name that is a system color it supports. If no name is supported, it uses the `fallback`. Names that are not system colors (for example, iOS or Android color names) are skipped.

```js
import { PlatformColor } from 'react-native';

const color = PlatformColor('AccentColor', 'Highlight', { fallback: 'blue' });
```

Newer system colors (`AccentColor`, `Mark`, …) map to CSS custom properties that are defined only when the browser supports them, so the server and browser output match.

:::callout
**Note:** `PlatformColor` is not supported by `Animated`.
:::

---

## API

### Arguments

{% call macro.prop('...names', 'string') %}
One or more system color names, in order of priority. Names are not case-sensitive.
{% endcall %}

{% call macro.prop('options', '?{ fallback: string }') %}
Optional last argument. The `fallback` color is used when no name is supported.
{% endcall %}

### Return value

`PlatformColor` returns a color string, or `undefined` when no name is a system color and there is no `fallback`.
