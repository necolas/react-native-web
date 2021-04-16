---
title: View
date: Last Modified
permalink: /docs/view/index.html
eleventyNavigation:
  key: View
  parent: Components
  label: "Change"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
The fundamental layout primitive.
:::

View uses a flexbox column layout by default. Every instance of `View` uses relative positioning by default and the `zIndex` can only be used to control the relative Z-axis stacking of siblings within their parent.

Raw text nodes are **not** allowed as children of View. A View nested within a Text will render inline without altering its display or that of its children.

```jsx
import { View } from 'react-native';

<View {...props}>{children}</View>;
```

:::callout
**Did you know?** `View` elements do not support text content or text styles. Style properties like `fontFamily` are only supported on `Text` and `TextInput` elements.
:::

---

## API

### Props

{% call macro.prop('...AccessibilityProps') %}
The [accessibility props]({{ '/docs/accessibility' | url }}).
{% endcall %}

{% call macro.prop('...ClickProps') %}
The [click props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...FocusProps') %}
The [focus props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...KeyboardProps') %}
The [keyboard props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...ResponderProps') %}
The [responder props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('children', 'any') %}
The children of a `View` element can be other elements and must *not* include strings (or components that render down to strings).
{% endcall %}

{% call macro.prop('dataSet', '?Object') %}
Equivalent to [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset).
{% endcall %}

{% call macro.prop('dir', '?("ltr" | "rtl")') %}
Equivalent to [HTMLElement.dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
{% endcall %}

{% call macro.prop('focusable', '?boolean') %}
Set whether the view can receive keyboard focus.
{% endcall %}

{% call macro.prop('href', '?string') %}
If `href` is defined, the view is rendered as an anchor tag pointing to this URL.
{% endcall %}

{% call macro.prop('hrefAttrs', '?Object') %}
If `href` is defined, this prop defines related attributes to include on the anchor (e.g., `download`, `rel`, `target`) which may modify its behavior.
{% endcall %}

{% call macro.prop('nativeID', '?string') %}
Equivalent to [HTMLElement.id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
{% endcall %}

{% call macro.prop('onLayout', '?({ nativeEvent: { layout: { x, y, width, height } } }) => void') %}
This is invoked when a component is mounted and when its layout changes. `x` and `y` are the offsets from the parent node.
{% endcall %}

{% call macro.prop('pointerEvents', '?("all" | "none" | "box-only" | "box-none")') %}
Equivalent to [CSS pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) with 2 additional values. A value of `"box-none"` preserves pointer events on the element's children; `"box-only"` disables pointer events on the element's children.
{% endcall %}

{% call macro.prop('style', '?Style') %}
Set the styles of the view.
{% endcall %}

{% call macro.prop('testID', '?string') %}
Set the test selector label (via `data-testid`).
{% endcall %}

---

## Examples

{{ macro.codesandbox('view') }}
