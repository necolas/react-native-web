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
Adds pull to refresh to a ScrollView, FlatList, or SectionList.
:::

```jsx
import { RefreshControl, ScrollView } from 'react-native';

<ScrollView refreshControl={<RefreshControl {...props} />} />;
```

A pull down from the top of the scroll view calls `onRefresh`. The pull works with touch input. Mouse and wheel input do not start a pull. While `refreshing` is `true`, a circular indicator shows over the top of the scroll view, the same as on Android. In an inverted list, the indicator shows at the bottom, and the pull moves up the screen.

The iOS props `title` and `titleColor` have no effect on web.

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('colors', '?Array<string>') %}
The color of the indicator. Only the first color is used.
{% endcall %}

{% call macro.prop('enabled', '?boolean') %}
Default `true`. Set whether a pull can start a refresh.
{% endcall %}

{% call macro.prop('onRefresh', '?() => void') %}
Called when the user releases a pull that is far enough to start a refresh.
{% endcall %}

{% call macro.prop('progressBackgroundColor', '?string') %}
Default `"#fafafa"`. The color of the circle behind the indicator.
{% endcall %}

{% call macro.prop('progressViewOffset', '?number') %}
Default `0`. Moves the indicator down by this number of pixels.
{% endcall %}

{% call macro.prop('refreshing', 'boolean') %}
Set whether the indicator shows a refresh in progress. Set it to `true` in `onRefresh`, and to `false` when the refresh is complete.
{% endcall %}

{% call macro.prop('size', '?("default" | "large")') %}
Default `"default"`. The size of the indicator.
{% endcall %}

{% call macro.prop('tintColor', '?string') %}
The color of the indicator, when `colors` is not set.
{% endcall %}

---

## Examples

{{ macro.example('refresh-control') }}
