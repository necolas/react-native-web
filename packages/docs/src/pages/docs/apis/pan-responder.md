---
title: PanResponder
date: Last Modified
permalink: /docs/pan-responder/index.html
eleventyNavigation:
  key: PanResponder
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
PanResponder reconciles several pointers into a single gesture. It makes single-pointer gestures resilient to extra touches, and can be used to recognize basic multi-touch gestures.
:::

:::callout
**Note:** Using PanResponder on components that contain text will interrupt dragging the component to begin selecting the text instead. You can avoid this by applying the following CSS to the text elements: `userSelect: 'none'`.
:::

Please refer to the React Native documentation below:

* [PanResponder](https://reactnative.dev/docs/panresponder)

---

## Examples

{{ macro.codesandbox('pan-responder') }}
