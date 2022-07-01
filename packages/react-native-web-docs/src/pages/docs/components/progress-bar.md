---
title: ProgressBar
date: Last Modified
permalink: /docs/progress-bar/index.html
eleventyNavigation:
  key: ProgressBar
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Display an activity progress bar.
:::

```jsx
import { ProgressBar } from 'react-native';

<ProgressBar {...props} />;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('color', '?string = "#1976D2"') %}
Set the background color of the button.
{% endcall %}

{% call macro.prop('indeterminate', '?boolean = false') %}
Whether the progress bar will show indeterminate progress.
{% endcall %}

{% call macro.prop('progress', '?number = 0') %}
The progress value between `0` and `1`.
{% endcall %}

{% call macro.prop('trackColor', '?string = "transparent"') %}
Customize the color of the track bar.
{% endcall %}

---

## Examples

Custom sizes can be created using style properties.

{{ macro.codesandbox('progress-bar') }}
