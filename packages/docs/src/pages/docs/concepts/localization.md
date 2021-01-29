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
Localized layout is largely automatic if you follow this guide.
:::

{{ site.name }} provides several mechanisms to automatically flip application layout to match the writing direction of the primary language.

## Localized component layout

To automatically flip the layout of a flexbox or grid container, set the `dir` prop on `View`, `Text`, or `TextInput` components to desired writing direction (e.g., `"rtl"`). By default, the native writing direction is set to `"auto"` for `Text` and `TextInput` elements. This uses the browser's built-in writing direction algorithm to detect whether the text should be displayed left-to-right or right-to-left.

You can also set the `lang` prop on `Text` or `TextInput` to provide browsers with information about the language of the text.

```jsx
const style = { alignItems: 'flex-start' };
return (
  <View dir="rtl" style={style}>
    <Text lang="ar">...</Text>
  </View>
);
```

The non-standard [direction-independent style properties]({{ '/docs/styling/#non-standard-properties' | url }}) should also be used as much as possible. {{ site.name }} will automatically flip the direction of these properties when the application is re-rendered after using `I18nManager` to enable RTL mode.

```jsx
// "start" is "left" for LTR and "right" for RTL
const style = { paddingStart: 10, marginStart: 10 };
return (
  <View style={style} />
);
```

The `I18nManager` API can also be used to help with more fine-grained control of layout, e.g., flipping images or transforms.

```jsx
const { isRTL } = I18nManager.getConstants();
const transform = { [{ scaleX: isRTL ? -1 : 1 }] };

<Image source={'forward.svg'} style={transform} />
<Image source={isRTL ? 'back.svg' : 'forward.svg'} />
```

## Localized application layout

The application will automatically display as RTL if rendered *after* setting the direction to RTL.

```js
// Either force RTL (e.g., for unit tests)
I18nManager.forceRTL(true);

// Or set RTL if you know the language is RTL
I18nManager.setPreferredLanguageRTL(true);
```

Once the application is rendered in RTL mode, it will flip all the direction-independent styles and ensure that the `isRTL` constant is `true`.
