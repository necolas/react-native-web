---
title: AppState
date: Last Modified
permalink: /docs/app-state/index.html
eleventyNavigation:
  key: AppState
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
AppState can tell you if the app is in the foreground or background, and notify you when the state changes.
:::

States: active (the app is running in the foreground), background (the app is running in the background, i.e., the user has not focused the app's tab).


```js
import { AppState } from 'react-native';
```

---

## API

### Static properties

{% call macro.prop('isAvailable', 'boolean') %}
Whether the browser environment supports `AppState`.
{% endcall %}

{% call macro.prop('currentState', '?("active" | "background")') %}
Returns the current state of the app.
{% endcall %}

### Static methods

{% call macro.prop('addEventListener', '(type: ?string, listener: (boolean) => void) => ?EmitterSubscription') %}
Add a listener to `AppState` changes. Listen to the `"change"` event type. The handler is called with the app state value.
{% endcall %}

{% call macro.prop('removeEventListener', '(type: ?string, listener: (boolean) => void) => void') %}
Remove a listener from `AppState` changes.
{% endcall %}

---

## Examples

{{ macro.codesandbox('app-state') }}
