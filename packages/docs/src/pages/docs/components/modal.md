---
title: Modal
date: Last Modified
permalink: /docs/modal/index.html
eleventyNavigation:
  key: Modal
  parent: Components
  label: "New"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
A basic way to present content above an enclosing view. Modals may be nested within other Modals.
:::

```jsx
import { Modal } from 'react-native';

<Modal {...props}>{children}</Modal>;
```

---

## API

### Props

{% call macro.prop('animationType', '?("fade" | "none" | "slide")') %}
Default is `"none"`. This can be used to add an animation to the modal being opened or closed.
{% endcall %}

{% call macro.prop('children', '?any') %}
The children of a `Modal` element will be hidden or shown depending on the modal visibility.
{% endcall %}

{% call macro.prop('onDismiss', '?() => void') %}
Called after the modal has been dismissed and is no longer visible.
{% endcall %}

{% call macro.prop('onRequestClose', '?() => void') %}
Called when the user is attempting to close the modal like when they hit `Escape`. Only the top-most Modal responds to hitting `Escape`.
{% endcall %}

{% call macro.prop('onShow', '?() => void') %}
Called after the modal has been shown and may be visible.
{% endcall %}

{% call macro.prop('transparent', '?boolean = false') %}
Determines if the modal is rendered with a transparent backdrop or a white backdrop
{% endcall %}

{% call macro.prop('visible', '?boolean = true') %}
Determines if the modal and its content is rendered.
{% endcall %}

---

## Examples

{{ macro.codesandbox('modal') }}
