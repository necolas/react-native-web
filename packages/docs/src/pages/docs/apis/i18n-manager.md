---
title: I18nManager
date: Last Modified
permalink: /docs/i18n-manager/index.html
eleventyNavigation:
  key: I18nManager
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Control and query the layout and writing direction of the application.
:::

```js
import { I18nManager } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('allowRTL', '(boolean) => void') %}
Allow the application to display in RTL mode.
{% endcall %}

{% call macro.prop('forceRTL', '(boolean) => void') %}
Force the application to display in RTL mode.
{% endcall %}

{% call macro.prop('getConstants', '() => I18nConstants') %}
Determine how the application is handling bidi layout.
{% endcall %}

{% call macro.prop('swapLeftAndRightInRTL', '(boolean) => void') %}
Control whether the application swaps `left`/`right` styles in RTL mode. It is recommended that applications rely on `start`/`end` styles and disable automatic BiDi-flipping of `left`/`right` styles.
{% endcall %}

{% call macro.prop('setPreferredLanguageRTL', '(boolean) => void') %}
Set the application's preferred writing direction to RTL. You may need to infer the user's preferred locale on the server (from HTTP headers) and decide whether it's an RTL language. (Web-only)
{% endcall %}

### I18nConstants

The object returned by `I18nManager.getConstants()`.

{% call macro.prop('isRTL', 'boolean = false') %}
Whether the application is currently in RTL mode.
{% endcall %}

{% call macro.prop('doLeftAndRightSwapInRTL', 'boolean = true') %}
Whether the application swaps left/right styles in RTL mode.
{% endcall %}

---

## Examples

{{ macro.codesandbox('i18n-manager') }}
