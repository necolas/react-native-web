---
title: Pressable
date: Last Modified
permalink: /docs/pressable/index.html
eleventyNavigation:
  key: Pressable
  parent: Components
  label: "New"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Pressable is a component that can detect various parts of press interactions on any of its defined children.
:::

`Pressable` responds to touch, mouse, and keyboard interactions. The interaction state of the view is exposed to the `children` and `style` props which accept a callback as their value. The `hover` state is only activated by mouse interactions.

```jsx
import { Pressable } from 'react-native';

<Pressable {...props}>{children}</Pressable>;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('children', '?(any | (state: InteractionState) => any)') %}
The children of the view. Supports computing children as a function of interaction state.
{% endcall %}

{% call macro.prop('delayLongPress', '?number = 500') %}
How long to delay calling `onLongPress` after `onPressIn` is called.
{% endcall %}

{% call macro.prop('delayPressIn', '?number = 0') %}
How long to delay calling `onPressIn` after an interaction begins.
{% endcall %}

{% call macro.prop('delayPressOut', '?number = 0') %}
How long to delay calling `onPressOut` after an interaction ends.
{% endcall %}

{% call macro.prop('disabled', '?boolean') %}
Disables all pointer interactions with the element.
{% endcall %}

{% call macro.prop('onHoverIn', '?(e: MouseEvent) => void') %}
Called when the pointer starts hovering over the element. Touch interactions have no effect.
{% endcall %}

{% call macro.prop('onHoverOut', '?(e: MouseEvent) => void') %}
Called when the pointer stops hovering over the element. Touch interactions have no effect.
{% endcall %}

{% call macro.prop('onLongPress', '?() => void') %}
Called when the pointer is held down for as long as the value of `delayLongPress`.
{% endcall %}

{% call macro.prop('onPress', '?(e: MouseEvent) => void') %}
Called when the pointer is released without first being cancelled (e.g. by a scroll that steals the responder lock). Equivalent to the `click` DOM event. 
{% endcall %}

{% call macro.prop('onPressIn', '?(e: ResponderEvent) => void') %}
Called when the pointer starts interacting with the element after `delayPressIn` ms.
{% endcall %}

{% call macro.prop('onPressOut', '?(e: ResponderEvent) => void') %}
Called when the pointer stops interacting with the element after `delayPressOut` ms.
{% endcall %}

{% call macro.prop('style', '?(Style | (state: InteractionState) => Style)') %}
The style of the view. Supports computing style as a function of interaction state.
{% endcall %}

{% call macro.prop('testOnly_hovered', '?boolean') %}
Used only for documentation or testing (e.g. snapshot testing).
{% endcall %}

{% call macro.prop('testOnly_pressed', '?boolean') %}
Used only for documentation or testing (e.g. snapshot testing).
{% endcall %}

### InteractionState

The state object passed to function values of `children` and `state` reflects the current state of the user interaction with the view.

{% call macro.prop('focused', 'boolean') %}
Whether the view is currently focused.
{% endcall %}

{% call macro.prop('hovered', 'boolean') %}
Whether the view is being hovered over by a mouse.
{% endcall %}

{% call macro.prop('pressed', 'boolean') %}
Whether the view is being pressed by a pointer or keyboard interaction key.
{% endcall %}

---

## Examples

{{ macro.codesandbox('pressable') }}
