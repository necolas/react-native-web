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

{% call macro.prop('...PointerProps') %}
The [PointerEvent props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...FocusProps') %}
The [FocusEvent props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...KeyboardProps') %}
The [KeyboardEvent props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...ResponderProps') %}
The [ResponderEvent props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('children', 'any') %}
The children of a `View` element can be other elements and must *not* include strings (or components that render down to strings).
{% endcall %}

{% call macro.prop('dataSet', '?Object') %}
Equivalent to [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset).
{% endcall %}

{% call macro.prop('dir', '?("ltr" | "rtl")') %}
Equivalent to [HTMLElement.dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir).
{% endcall %}

{% call macro.prop('href', '?string') %}
If `href` is defined, the view is rendered as an anchor tag pointing to this URL.
{% endcall %}

{% call macro.prop('hrefAttrs', '?Object') %}
If `href` is defined, this prop defines related attributes to include on the anchor (e.g., `download`, `rel`, `target`) which may modify its behavior.
{% endcall %}

{% call macro.prop('id', '?string') %}
Equivalent to [HTMLElement.id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
{% endcall %}

{% call macro.prop('lang', '?string') %}
Equivalent to [HTMLElement.lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang). This prop is used to infer writing direction if no `dir` is set.
{% endcall %}

{% call macro.prop('onLayout', '?({ nativeEvent: { layout: { x, y, width, height } } }) => void') %}
This is invoked when a component is mounted and when its layout changes. `x` and `y` are the offsets from the parent node.
{% endcall %}

{% call macro.prop('style', '?Style') %}
Set the styles of the view.
{% endcall %}

{% call macro.prop('tabIndex', '0 | -1') %}
Set whether the view can receive keyboard focus.
{% endcall %}

{% call macro.prop('testID', '?string') %}
Set the test selector label (via `data-testid`).
{% endcall %}

---

## Examples

{{ macro.codesandbox('view') }}
