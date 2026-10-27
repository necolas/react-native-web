---
title: useAnimatedColor
date: Last Modified
permalink: /docs/use-animated-color/index.html
eleventyNavigation:
  key: useAnimatedColor
  parent: Hooks
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Create an `Animated.Color` that persists for the lifetime of a component.
:::

`useAnimatedColor` creates an `Animated.Color` on the first render and returns the same instance on every subsequent render. Changes to the arguments after the first render are ignored.

```js
import { Animated, useAnimatedColor } from 'react-native';
const backgroundColor = useAnimatedColor('red');
```

---

## API

### Arguments

{% call macro.prop('inputValue', '?(string | { r: number, g: number, b: number, a: number })') %}
The initial value of the `Animated.Color`. Defaults to `{ r: 0, g: 0, b: 0, a: 1 }`.
{% endcall %}

{% call macro.prop('config', '?{ useNativeDriver: boolean }') %}
Optional configuration passed to the `Animated.Color` constructor. `useNativeDriver` is not supported on web.
{% endcall %}

### Return value

`useAnimatedColor` returns an `Animated.Color`.
