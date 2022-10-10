---
title: Localization
date: Last Modified
permalink: /docs/localization/index.html
eleventyNavigation:
  key: Localization
  parent: Concepts
  label: "Change"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
A guide to producing localized layout for different locales.
:::

{{ site.name }} provides simple mechanisms to automatically flip layouts to match the writing direction of the app or a specific component tree.


## Localization styles

The non-standard [direction-independent style properties and values]({{ '/docs/styling/#non-standard-properties' | url }}) (e.g., `marginStart`) should be used as much as possible. {{ site.name }} will automatically flip the direction of these properties within subtrees based on the writing direction of the ancestor tree.

```jsx
// "start" is "left" for LTR and "right" for RTL
const style = { paddingStart: 10, marginStart: 10 };
return (
  <View style={style} />
);
```

## Localization props

To automatically flip the layout of a component and its subtree, you can either:

1. Set the `dir` prop to the desired writing direction (e.g., `"rtl"`).
2. Set the `lang` prop to the locale of the content.

```jsx
<View dir="ltr">...</View>
<Text lang="ar">...</Text>
```

By default, the native writing direction of `Text` and `TextInput` components is set to `"auto"`. This uses the browser's built-in writing direction algorithm to detect whether the text should be displayed left-to-right or right-to-left.

## Localization hook

The `useLocaleContext` API can be used for fine-grained control of layout, e.g., flipping images or transforms.

```jsx
const { direction, locale } = useLocaleContext();

const isRTL = direction === 'rtl';
const style = { transform: [{ scaleX: isRTL ? -1 : 1 }] };

<Image source={'forward.svg'} style={style} />
<Image source={isRTL ? 'back.svg' : 'forward.svg'} />
```
