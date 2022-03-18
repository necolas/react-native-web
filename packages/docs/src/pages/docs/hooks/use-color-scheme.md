---
title: useColorScheme
date: Last Modified
permalink: /docs/use-color-scheme/index.html
eleventyNavigation:
  key: useColorScheme 
  parent: Hooks
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Respond to color scheme updates from the `Appearance` module.
:::

The return value indicates the current user preferred color scheme. The value may be updated later, either through direct user action (e.g., theme selection in device settings) or on a schedule (e.g., light and dark themes that follow the day/night cycle).

```js
import { useColorScheme } from 'react-native';
const colorScheme = useColorScheme();
```

---

## API

### Return value

`useColorScheme` returns the color scheme value.

{% call macro.prop('colorScheme', '"dark" | "light" | null') %}
A string representing the color scheme.
{% endcall %}
