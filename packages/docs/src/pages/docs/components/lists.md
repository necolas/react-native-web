---
title: Lists
date: Last Modified
permalink: /docs/lists/index.html
eleventyNavigation:
  key: Lists
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Basic support for FlatList, SectionList, and VirtualizedList.
:::

These components are the same JavaScript implementations as those found in React Native. Please refer to the React Native documentation below:

* [FlatList](https://reactnative.dev/docs/flatlist)
* [SectionList](https://reactnative.dev/docs/sectionlist)
* [VirtualizedList](https://reactnative.dev/docs/virtualizedlist)

:::callout
**Warning!** The React Native list components are not optimized for the web. You may prefer to use external modules that are designed for multi-platform lists and provide better performance, e.g., [RecyclerListView](https://github.com/Flipkart/recyclerlistview).
:::

---

## Examples

{{ macro.codesandbox('lists') }}
