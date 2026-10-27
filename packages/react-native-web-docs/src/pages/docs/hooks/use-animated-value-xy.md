---
title: useAnimatedValueXY
date: Last Modified
permalink: /docs/use-animated-value-xy/index.html
eleventyNavigation:
  key: useAnimatedValueXY
  parent: Hooks
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Create an `Animated.ValueXY` that persists for the lifetime of a component.
:::

`useAnimatedValueXY` creates an `Animated.ValueXY` on the first render and returns the same instance on every subsequent render. Changes to the arguments after the first render are ignored.

```js
import { Animated, useAnimatedValueXY } from 'react-native';
const position = useAnimatedValueXY({ x: 0, y: 0 });
```

---

## API

### Arguments

{% call macro.prop('initialValue', '{ x: number, y: number }') %}
The initial value of the `Animated.ValueXY`.
{% endcall %}

{% call macro.prop('config', '?{ useNativeDriver: boolean }') %}
Optional configuration. `useNativeDriver` is not supported on web, so this argument is ignored.
{% endcall %}

### Return value

`useAnimatedValueXY` returns an `Animated.ValueXY`.
