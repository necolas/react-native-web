---
title: Text
date: Last Modified
permalink: /docs/text/index.html
eleventyNavigation:
  key: Text
  parent: Components
  label: "Change"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
The fundamental text primitive. `Text` inherits typographic styles from ancestor `Text` elements.
:::

`Text` has built in accessibility controls, enforces inline layout by default, provides limited inheritance of text styles, and supports `View` as children. It inherits typographic styles from ancestor `Text` elements (as long as the chain of text elements is not interrupted by a `View`). By default, text is rendered using the native platform’s algorithm to determine the directionality of the content language.

```jsx
import { Text } from 'react-native';

<Text {...props}>{children}</Text>;
```

::: callout 
**Did you know?** Text styling in {{ site.name }} has stricter rules than it does on the web. Read the [Styling]({{ '/docs/styling' | url }}) guide to learn more.
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
The children of a `Text` element can be strings as well as other elements like `<View />` and `<Image />`. Nested text components will inherit the typographic styles of their parents.
{% endcall %}

{% call macro.prop('dataSet', '?Object') %}
Equivalent to [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset).
{% endcall %}

{% call macro.prop('dir', '?("auto" | "ltr" | "rtl") = "auto"') %}
Equivalent to [HTMLElement.dir](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir). The default value of `"auto"` is not set on *nested* text elements.
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

{% call macro.prop('lang', '?string') %}
Equivalent to [HTMLElement.lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).
{% endcall %}

{% call macro.prop('nativeID', '?string') %}
Equivalent to [HTMLElement.id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
{% endcall %}

{% call macro.prop('numberOfLines', '?number') %}
Truncates the text with an ellipsis after this many lines.
{% endcall %}

{% call macro.prop('onLayout', '?({ nativeEvent: { layout: { x, y, width, height } } }) => void') %}
This is invoked when a component is mounted and when its layout changes. `x` and `y` are the offsets from the parent node.
{% endcall %}

{% call macro.prop('selectable', '?boolean = true') %}
When `false`, the text is not selectable.
{% endcall %}

{% call macro.prop('style', '?Style') %}
Set the styles of the text. `Text` supports typographic styles in addition to those of `View`.
{% endcall %}

{% call macro.prop('testID', '?string') %}
Set the test selector label (via `data-testid`).
{% endcall %}

---

## Examples

{{ macro.codesandbox('text') }}
