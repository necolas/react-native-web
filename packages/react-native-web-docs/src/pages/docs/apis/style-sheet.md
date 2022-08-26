---
title: StyleSheet
date: Last Modified
permalink: /docs/style-sheet/index.html
eleventyNavigation:
  key: StyleSheet
  parent: APIs
  label: "Change"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Work with strict styles that provide deterministic rendering and automatically adapt to localized writing direction.
:::

The StyleSheet abstraction converts predefined styles to (vendor-prefixed) CSS without requiring a compile-time step. Styles that cannot be resolved outside of the render loop (e.g., dynamic positioning) are usually applied as inline styles.

```js
import { StyleSheet } from 'react-native';
```

::: callout
**Did you know?** StyleSheet automatically merges styles and produces "utility" CSS for lightweight, reliable, and performant styling. Read more in the [styling]({{ '/docs/styling' | url }}) guide.
:::

---

## API

### Static properties

{% call macro.prop('absoluteFill', '?number') %}
A very common pattern is to create overlays with position absolute and zero positioning, so `absoluteFill` can be used for convenience and to reduce duplication of these repeated styles.
{% endcall %}

{% call macro.prop('absoluteFillObject', '?Object') %}
Sometimes you may want `absoluteFill` but with a couple tweaks - `absoluteFillObject` can be used to create a customized entry in a StyleSheet.
{% endcall %}

{% call macro.prop('hairlineWidth', '?Object') %}
Equal to 1px. This is not implemented using screen density as browsers may round sub-pixel values down to `0`, causing the line not to be rendered.
{% endcall %}

### Static methods

{% call macro.prop('create', '({ [key]: ruleset }) => ({ [key]: ruleset })') %}
Define style objects. Each key of the object passed to `create` must define a style object. These values should not be introspected at runtime.
{% endcall %}

{% call macro.prop('flatten', '(styles: Style) => Object') %}
Flatten an array of styles into a single style object. **This is not recommended as it is not compatible with static extraction of styles to CSS.**
{% endcall %}
