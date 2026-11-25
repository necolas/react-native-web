---
title: Localization
date: Last Modified
permalink: /docs/localization/index.html
eleventyNavigation:
  key: Localization
  parent: Concepts
---

{% import "fragments/macros.html" as macro with context %}

:::lead
A guide to producing localized layout for different locales.
:::

{{ site.name }} provides simple mechanisms to automatically flip layouts to match the writing direction of the app or a specific component tree.

## Localization styles

The non-standard [direction-independent style properties and values]({{ '/docs/styling/#non-standard-properties' | url }}) (e.g., `marginStart`) should be used as much as possible. They are output as CSS logical properties (e.g., `margin-inline-start`), so the browser resolves them from the writing direction of the element.

```jsx
// "start" is "left" for LTR and "right" for RTL
const style = { paddingInlineStart: 10, marginInlineStart: 10 };
return <View style={style} />;
```

## Document language and direction

Set the language and writing direction of the app on the `html` element. The `dir` attribute sets the direction of the whole page, and logical styles follow it. The `lang` attribute tells browsers and screen readers which language the content uses, for pronunciation, hyphenation, and font selection.

```html
<html lang="ar" dir="rtl">
```

Browsers, assistive technologies, and tools that read the page without CSS (e.g., reader modes and search engines) all use these attributes, so prefer them over styles for the direction of the whole app.

## Writing direction

To flip the layout of a component and its subtree, set the `direction` style to the desired writing direction (e.g., `"rtl"`).

```jsx
const styles = StyleSheet.create({ root: { direction: 'rtl' } });

<View style={styles.root}>...</View>;
```
