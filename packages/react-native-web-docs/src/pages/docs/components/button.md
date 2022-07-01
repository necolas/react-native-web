---
title: Button
date: Last Modified
permalink: /docs/button/index.html
eleventyNavigation:
  key: Button
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
A basic button component. Supports a minimal level of customization.
:::

You can also build a custom button using `Pressable`.

```jsx
import { Button } from 'react-native';

<Button {...props} />;
```

---

## API

### Props

{% call macro.prop('accessibilityLabel', '?string') %}
Equivalent to [aria-label](https://www.w3.org/TR/wai-aria-1.2/#aria-label).
{% endcall %}

{% call macro.prop('color', '?string') %}
Default `"#2196F3"`. Set the background color of the button.
{% endcall %}

{% call macro.prop('disabled', '?boolean') %}
Prevent all interactions with the button.
{% endcall %}

{% call macro.prop('onPress', '?(e: ClickEvent) => void') %}
Called when the button is pressed by a pointer or keyboard.
{% endcall %}

{% call macro.prop('testID', '?string') %}
Set the test selector label (via `data-testid`).
{% endcall %}

{% call macro.prop('title', 'string') %}
Set the text content of the button.
{% endcall %}

---

## Examples

{{ macro.codesandbox('button') }}
