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
**Note:** Using the `PanResponder` on components that contain text may cause native text selection events to interrupt the pan gesture. This can be avoided by setting `userSelect: 'none'` on the text elements while the gesture is active.
:::

Please refer to the React Native documentation below:

* [PanResponder](https://reactnative.dev/docs/panresponder)

---

## Examples

{{ macro.codesandbox('pan-responder') }}
