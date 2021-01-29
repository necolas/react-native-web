---
title: Picker
date: Last Modified
permalink: /docs/picker/index.html
eleventyNavigation:
  key: Picker
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Renders the native `<select>` component
:::

```jsx
import { Picker } from 'react-native';

<Picker {...props}>
  <Picker.Item />
</Picker>;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('children', '?(...Picker.Item)') %}
The items to display in the picker must be of type `Picker.Item`.
{% endcall %}

{% call macro.prop('enabled', '?boolean = true') %}
Determines if the picker will be disabled, i.e., the user will not be able to make a selection.
{% endcall %}

{% call macro.prop('onValueChange', '?(value, index) => void') %}
Callback for when an item is selected. This is called with the value and index prop of the item that was selected.
{% endcall %}

{% call macro.prop('selectedValue', '?string') %}
Select the item with the matching value.
{% endcall %}

{% call macro.prop('style', '?{ ...ViewProps.style, color: ?string }') %}
Supported style properties.
{% endcall %}

### Picker.Item

{% call macro.prop('color', '?string') %}
Color of the item label. (Limited by browser support.)
{% endcall %}

{% call macro.prop('label', '?string') %}
Text to display for this item.
{% endcall %}

{% call macro.prop('testID', '?string') %}
Used to locate this view in end-to-end tests.
{% endcall %}

{% call macro.prop('value', '?(number | string)') %}
The value to be passed to the picker's `onValueChange` callback when this item is selected.
{% endcall %}
