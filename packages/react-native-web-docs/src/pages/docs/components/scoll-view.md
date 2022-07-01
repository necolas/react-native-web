---
title: ScrollView
date: Last Modified
permalink: /docs/scroll-view/index.html
eleventyNavigation:
  key: ScrollView
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
A scrollable view that provides integration with the pointer-locking responder system.
:::

ScrollView must have a bounded height: either set the height of the view directly (discouraged) or make sure all parent views have bounded height (e.g., apply `{ flex: 1}` down the view stack).

```jsx
import { ScrollView } from 'react-native';

<ScrollView {...props}>{children}</ScrollView>;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('contentContainerStyle', '?Style') %}
These styles will be applied to the scroll view content container which wraps all of the child views.
{% endcall %}


{% call macro.prop('disableScrollViewPanResponder', '?boolean = false') %}
When `true`, the default `PanResponder` on the `ScrollView` is disabled, and full control over pointers inside the `ScrollView` is left to its child components. This is meant to be used when native "snap-to" scrolling behavior is needed.
{% endcall %}

{% call macro.prop('horizontal', '?boolean = false') %}
When `true`, the scroll view's children are arranged horizontally in a row instead of vertically in a column.
{% endcall %}

{% call macro.prop('keyboardDismissMode', '?("none" | "on-drag")') %}
Determines whether the keyboard gets dismissed in response to a scroll drag.
{% endcall %}

{% call macro.prop('onContentSizeChange', '?(width: number, height: number) => void') %}
Called when scrollable content view of the ScrollView changes.
{% endcall %}

{% call macro.prop('onScroll', '?(e: ScrollEvent) => void') %}
Called during scrolling. The frequency of the events can be controlled using the `scrollEventThrottle` prop.
{% endcall %}

{% call macro.prop('pagingEnabled', '?boolean = false') %}
When `true`, the scroll view snaps to individual items in the list when scrolling.
{% endcall %}

{% call macro.prop('scrollEnabled', '?boolean = true') %}
When `false`, the content does not scroll.
{% endcall %}

{% call macro.prop('scrollEventThrottle', '?number = 0') %}
This controls how often the scroll event will be fired while scrolling (as a time interval in ms). A lower number yields better accuracy for code that is tracking the scroll position, but can lead to scroll performance problems. The default value is `0`, which means the scroll event will be sent only once each time the view is scrolled.
{% endcall %}

{% call macro.prop('stickyHeaderIndices', '?Array<number>') %}
An array of child indices determining which children get docked to the top of the screen when scrolling. For example, passing `stickyHeaderIndices={0}` will cause the first child to be fixed to the top of the scroll view. This property is not supported in conjunction with the `horizontal` prop.
{% endcall %}

### ScrollEvent

The `nativeEvent` on the event passed to `onScroll` is a custom object of information related to the layout of the ScrollView.

{% call macro.prop('contentOffset', '{ x: number, y: number}') %}
How far the scroll view is scrolled along each axis.
{% endcall %}

{% call macro.prop('contentSize', '{ height: number, width: number}') %}
The size of the scrollable content area.
{% endcall %}

{% call macro.prop('layoutMeasurement', '{ height: number, width: number}') %}
The `border-box` height and width of the scroll view.
{% endcall %}

### Instant methods

{% call macro.prop('getInnerViewNode', '() => void') %}
Returns a reference to the underlying content container DOM node within the `ScrollView`.
{% endcall %}

{% call macro.prop('getScrollableNode', '() => void') %}
Returns a reference to the underlying scrollable DOM node.
{% endcall %}

{% call macro.prop('getScrollResponder', '() => void') %}
Returns a reference to the underlying scroll responder, which supports operations like `scrollTo()`. All `ScrollView`-like components should implement this method so that they can be composed while providing access to the underlying scroll responder's methods.
{% endcall %}

{% call macro.prop('scrollTo', '(options?: { x: number, y: number, animated: boolean }) => void') %}
Scrolls to a given `x`, `y` offset (animation depends on browser support for scroll-behavior).
{% endcall %}

{% call macro.prop('scrollToEnd', '(options?: { animated: boolean }) => void') %}
Scrolls to the end of the scroll view.
{% endcall %}

---

## Examples

{{ macro.codesandbox('scroll-view') }}
