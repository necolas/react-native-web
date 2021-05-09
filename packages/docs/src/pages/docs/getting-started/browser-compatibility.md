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

* Chrome 60+
* Safari 10+ / iOS Safari 10+
* Edge 12+
* Firefox ESR+
* Internet Explorer 11
* Opera

If specific exports have a different browser support expectation, it will be documented with that export.

---

## JavaScript

Your application may need to polyfill `Promise`, `Object.assign`, `Array.from`, and [`ResizeObserver`](https://github.com/que-etc/resize-observer-polyfill) as necessary for your desired browser support.

---

## CSS

Most CSS properties and values are supported. Vendor prefixes are automatically provided where necessary. For example, if you use the following style:

```js
const style = {
  userSelect: 'none'
}
```

The resulting CSS is:

```css
.r-userSelect-24jds {
  -webkit-user-select: none;
  user-select: none;
}
```

Certain CSS properties are not supported across all browsers, but are polyfilled by {{ site.name }}.

(N.B. Safari prior to version 10.1 can suffer from extremely [poor flexbox performance](https://bugs.webkit.org/show_bug.cgi?id=150445). The recommended way to work around this issue (as used on mobile.twitter.com) is to set `display:block` on Views in your element hierarchy that you know don't need flexbox layout.)
