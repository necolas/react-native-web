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

{% call macro.prop('constants', '{ reactNativeVersion }') %}
`reactNativeVersion` is always `{ major: 0, minor: 0, patch: 0, prerelease: undefined }` on web.
{% endcall %}

{% call macro.prop('isDisableAnimations', 'false') %}
This value is always `false` on web.
{% endcall %}

{% call macro.prop('isTV', 'false') %}
This value is always `false` on web.
{% endcall %}

{% call macro.prop('isTesting', 'boolean') %}
This value is `true` when `process.env.NODE_ENV` is `"test"`.
{% endcall %}

{% call macro.prop('OS', '"web"') %}
This value will be `"web"` when running in a Web browser.
{% endcall %}

{% call macro.prop('Version', '"0.0.0"') %}
This value is always `"0.0.0"` on web.
{% endcall %}

### Static methods

{% call macro.prop('select', '(config) => any') %}
Takes an object containing `Platform.OS` values as keys and returns the value for the platform you are currently running on.
{% endcall %}
