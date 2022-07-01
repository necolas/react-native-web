---
title: CheckBox
date: Last Modified
permalink: /docs/checkbox/index.html
eleventyNavigation:
  key: CheckBox
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
An accessible checkbox component with customizable appearance.
:::

`CheckBox` is a controlled component. The `onValueChange` callback should be used to update the `value` prop to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.

```jsx
import { CheckBox } from 'react-native-web';

<CheckBox {...props} />;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('color', '?string = "#AAB8C2"') %}
Set the background color of the checkbox.
{% endcall %}

{% call macro.prop('disabled', '?boolean') %}
Prevent all interactions with the checkbox.
{% endcall %}

{% call macro.prop('onChange', '?(e: ChangeEvent) => void') %}
Called when the state of the native checkbox changes.
{% endcall %}

{% call macro.prop('onValueChange', '?(value: boolean | "mixed") => void') %}
Called when the state of the native checkbox changes.
{% endcall %}

{% call macro.prop('value', '?(boolean | "mixed") = false') %}
Set the value of the checkbox.
{% endcall %}

---

## Examples

Note that the size of the checkbox can be controlled by changing the `height` and `width` style properties.

{{ macro.codesandbox('checkbox') }}
