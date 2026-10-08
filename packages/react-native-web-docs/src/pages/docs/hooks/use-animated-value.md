---
title: useAnimatedValue
date: Last Modified
permalink: /docs/use-animated-value/index.html
eleventyNavigation:
  key: useAnimatedValue
  parent: Hooks
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Create an `Animated.Value` that persists for the lifetime of a component.
:::

`useAnimatedValue` creates an `Animated.Value` on the first render and returns the same instance on every subsequent render.

```js
import { Animated, useAnimatedValue } from 'react-native';
const fadeAnim = useAnimatedValue(0);
```

---

## API

### Arguments

{% call macro.prop('initialValue', 'number') %}
The initial value of the `Animated.Value`. Changes to this argument after the first render are ignored.
{% endcall %}

{% call macro.prop('config', '?{ useNativeDriver: boolean }') %}
Optional configuration passed to the `Animated.Value` constructor.
{% endcall %}

### Return value

`useAnimatedValue` returns an `Animated.Value`.
