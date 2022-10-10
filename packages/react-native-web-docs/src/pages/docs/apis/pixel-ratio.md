---
title: PixelRatio
date: Last Modified
permalink: /docs/pixel-ratio/index.html
eleventyNavigation:
  key: PixelRatio
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
`PixelRatio` class gives access to the device pixel density.
:::

```js
import { PixelRatio } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('get', '() => number') %}
Returns the device pixel density as a number.
{% endcall %}

{% call macro.prop('getFontScale', '() => number') %}
On web this returns the device pixel ratio as a number.
{% endcall %}

{% call macro.prop('getPixelSizeForLayoutSize', '(number) => number') %}
Converts a layout size (dp) to pixel size (px). Guaranteed to return an integer number.
{% endcall %}

{% call macro.prop('roundToNearestPixel', '(number) => number') %}
Rounds a layout size (dp) to the nearest layout size that corresponds to an integer number of pixels. For example, on a device with a PixelRatio of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to exactly (8.33 * 3) = 25 pixels.
{% endcall %}
