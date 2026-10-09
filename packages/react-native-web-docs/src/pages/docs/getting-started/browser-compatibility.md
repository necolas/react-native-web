---
title: Browser compatibility
date: Last Modified
permalink: /docs/browser-compatibility/index.html
eleventyNavigation:
  key: Browser compatibility
  parent: Start
  order: 4
---

:::lead
Understanding {{ site.name }} browser compatibility.
:::

{{ site.name }} is designed and tested for recent mobile and desktop browsers, for touch and mouse and keyboard interactions.

The browsers with known support include:

- Chrome 95+ / Edge 95+
- Firefox 93+
- Safari 15.1+ / iOS Safari 15.1+

If specific exports have a different browser support expectation, it will be documented with that export.

---

## CSS

Most CSS properties and values are supported. Vendor prefixes are automatically provided where necessary. For example, if you use the following style:

```js
const style = {
  userSelect: 'none'
};
```

The resulting CSS is:

```css
.r-userSelect-24jds {
  -webkit-user-select: none;
  user-select: none;
}
```

Certain CSS properties are not supported across all browsers, but are polyfilled by {{ site.name }}.
