---
title: Image
date: Last Modified
permalink: /docs/image/index.html
eleventyNavigation:
  key: Image
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
An accessible and responsive image component.
:::

This component renders images with flexbox layout and `cover` object-fit (rather than `stretch`) by default.

```jsx
import { Image } from 'react-native';

<Image {...props} />;
```

---

## API

### Props

{% call macro.prop('...ViewProps', '?ViewProps') %}
All the props supported by [View]({{ '/docs/view' | url }}).
{% endcall %}

{% call macro.prop('blurRadius', '?number') %}
The radius of the blur filter added to the image
{% endcall %}

{% call macro.prop('defaultSource', '?Source') %}
A static image to display while loading the image source.
{% endcall %}

{% call macro.prop('draggable', '?boolean = false') %}
Set whether the image can be dragged with native browser behavior. (Web-only)
{% endcall %}

{% call macro.prop('onError', '?({ nativeEvent: { error } }) => void') %}
Called when the image fails to load.
{% endcall %}

{% call macro.prop('onLoad', '?({ nativeEvent: LoadEvent ) => void') %}
Called when the image successfully loads.
{% endcall %}

{% call macro.prop('onLoadEnd', '?() => void') %}
Called when image loading ends.
{% endcall %}

{% call macro.prop('onLoadStart', '?() => void') %}
Called when the image loading starts.
{% endcall %}

{% call macro.prop('resizeMode', '?("center" | "cover" | "contain" | "none" | "stretch") = "cover"') %}
Determines how the image source is resized to fit the layout of the image element.
{% endcall %}

{% call macro.prop('source', '?(string | Source)') %}
The image source. The string can be a path to an external resource or a base64 encoded resource.
{% endcall %}

#### Source

{% call macro.prop('height', '?number') %}
Set the styles of the view.
{% endcall %}

{% call macro.prop('uri', '?string') %}
Set the styles of the view.
{% endcall %}

{% call macro.prop('width', '?number') %}
Set the styles of the view.
{% endcall %}

### Statics

{% call macro.prop('getSize', '?(url: string, complete, failure) => void') %}
Download an image and measure the width and height (in pixels) prior to displaying it. This method can fail if the image cannot be found, or fails to download.
Complete callback: `(width: number, height: number) => void`.
Failure callback: `() => void`.
{% endcall %}

{% call macro.prop('prefetch', '?(url: string) => Promise') %}
Prefetches a remote image for later use by downloading it. Once an image has been prefetched it is assumed to be in native browser caches and available for immediate rendering.
{% endcall %}

{% call macro.prop('queryCache', '?(urls: Array<string>) => Promise') %}
Performs cache interrogation. Returns a mapping from URL to cache status: "disk", "memory", "disk/memory". If a requested URL is not in the mapping, it means it's not in the cache.
{% endcall %}

{% call macro.prop('resolveAssetSource', '?(source: Source) => { uri: string, width?: number, height?: number }') %}
Resolves an asset reference into an object which has the properties uri, width, and height.
{% endcall %}

---

## Examples

{{ macro.codesandbox('image') }}
