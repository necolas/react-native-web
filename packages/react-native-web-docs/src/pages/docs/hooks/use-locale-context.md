---
title: useLocaleContext
date: Last Modified
permalink: /docs/use-locale-context/index.html
eleventyNavigation:
  key: useLocaleContext
  parent: Hooks
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Respond to locale and writing direction changes from ancestors.
:::

The return value matches the current locale and writing direction of the ancestral tree. The value will be updated for descendants when setting the `dir` or `lang` prop on an element.

```js
import { useLocaleContext } from 'react-native';
const { direction, locale } = useLocaleContext();
```

---

## API

### Return value

`useLocaleContext` returns the locale context.

{% call macro.prop('direction', '"ltr" | "rtl"') %}
A string representing the writing direction context.
{% endcall %}

{% call macro.prop('locale', '?string') %}
The locale context. Locale is `null` if a new direction context is set without an associated locale.
{% endcall %}
