---
title: Switch
date: Last Modified
permalink: /docs/switch/index.html
eleventyNavigation:
  key: Switch
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
A controlled component that renders a boolean input.
:::

`Switch` requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.

```jsx
import { Switch } from 'react-native';

<Switch {...props} />;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('activeThumbColor', '?string = "#009688"') %}
The color of the thumb grip when the switch is turned on. (Web-only)
{% endcall %}

{% call macro.prop('activeTrackColor', '?string = "#A3D3CF"') %}
The color of the track when the switch is turned on. (Web-only)
{% endcall %}

{% call macro.prop('disabled', '?boolean') %}
Disables interactions with the element. If `true`, the user won't be able to interact with the switch.
{% endcall %}

{% call macro.prop('onValueChange', '?(boolean) => void') %}
Invoked with the new value when the value changes.
{% endcall %}

{% call macro.prop('thumbColor', '?string = "#FAFAFA"') %}
The color of the thumb grip when the switch is turned off.
{% endcall %}

{% call macro.prop('trackColor', '?string => "#939393"') %}
The color of the track when the switch is turned off.
{% endcall %}

{% call macro.prop('value', '?boolean = false') %}
The value of the switch. If `true` the switch will be turned on.
{% endcall %}

---

## Examples

Custom sizes can be created using styles.

{{ macro.codesandbox('switch') }}
