---
title: ImageBackground
date: Last Modified
permalink: /docs/image-background/index.html
eleventyNavigation:
  key: ImageBackground
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
An image component with support for child content.
:::

```jsx
import { ImageBackground } from 'react-native';

<ImageBackground {...props}>{children}</ImageBackground>;
```

---

## API

### Props

{% call macro.prop('...ImageProps', '?ImageProps') %}
All the props supported by [Image]({{ '/docs/image' | url }}).
{% endcall %}

{% call macro.prop('children', '?any') %}
Content to display over the image.
{% endcall %}

{% call macro.prop('imageStyle', '?Style') %}
Styles to forward to the image component.
{% endcall %}

## Examples

{{ macro.codesandbox('image-background') }}
