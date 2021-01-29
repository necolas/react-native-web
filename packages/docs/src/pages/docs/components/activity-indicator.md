---
title: ActivityIndicator
date: Last Modified
permalink: /docs/activity-indicator/index.html
eleventyNavigation:
  key: ActivityIndicator
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Displays a customizable activity indicator.
:::

```jsx
import { ActivityIndicator } from 'react-native';

<ActivityIndicator {...props} />;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('animating', '?boolean') %}
Default `true`. Set whether the activity indicator is animating.
{% endcall %}

{% call macro.prop('color', '?string') %}
Default `"#1976D2"`. Set the color of the activity indicator.
{% endcall %}

{% call macro.prop('hidesWhenStopped', '?boolean') %}
Default `true`. Set whether the activity indicator is hidden when not animating.
{% endcall %}

{% call macro.prop('size', '?("small" | "large" | number)') %}
Default `"small"`. Set the size of the activity indicator.
{% endcall %}

---

## Examples

{{ macro.codesandbox('activity-indicator') }}
