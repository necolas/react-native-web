---
title: Platform
date: Last Modified
permalink: /docs/platform/index.html
eleventyNavigation:
  key: Platform
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Detect what is the platform in which the app is running.
:::

This piece of functionality can be useful when only small parts of a component are platform specific.

```js
import { Platform } from 'react-native';
```

---

## API

### Static properties

{% call macro.prop('OS', '"web"') %}
This value will be `"web"` when running in a Web browser.
{% endcall %}

### Static methods

{% call macro.prop('select', '(config) => any') %}
Takes an object containing `Platform.OS` values as keys and returns the value for the platform you are currently running on.
{% endcall %}
