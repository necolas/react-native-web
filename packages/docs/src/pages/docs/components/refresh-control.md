---
title: RefreshControl
date: Last Modified
permalink: /docs/refresh-control/index.html
eleventyNavigation:
  key: RefreshControl
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
This component is used inside a ScrollView or ListView to add pull to refresh functionality.
:::

When the ScrollView is at `scrollY: 0`, swiping down triggers an onRefresh event.

```jsx
import { ScrollView, RefreshControl } from 'react-native';

<ScrollView
  refreshControl={
    <RefreshControl onRefresh={handleOnRefresh} />
  }
  {...props}
>
  {children}
</ScrollView>;
```

---

## API

### Props

{% call macro.prop('refreshing', 'boolean') %}
Whether the view should be indicating an active refresh.
{% endcall %}

{% call macro.prop('enabled', '?boolean = true') %}
Whether the pull to refresh functionality is enabled.
{% endcall %}

{% call macro.prop('onRefresh', '?() => void') %}
Called when the view starts refreshing.
{% endcall %}

{% call macro.prop('progressBackgroundColor', '?ColorValue') %}
The background color of the refresh indicator.
{% endcall %}

{% call macro.prop('progressViewOffset', '?number = 50') %}
Progress view top offset.
{% endcall %}

{% call macro.prop('size', '?RefreshControl.SIZE = RefreshLayoutConsts.SIZE.DEFAULT') %}
Refer [RefreshControl.SIZE]({{ 'https://reactnative.dev/docs/refreshcontrol#size' | url}})
Size of the refresh indicator.
{% endcall %}

{% call macro.prop('tintColor', '?ColorValue') %}
The color of the refresh indicator.
{% endcall %}

---

## Examples

{{ macro.codesandbox('refresh-control') }}

