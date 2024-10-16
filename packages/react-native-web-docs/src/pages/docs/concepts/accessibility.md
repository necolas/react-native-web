---
title: Accessibility
date: Last Modified
permalink: /docs/accessibility/index.html
eleventyNavigation:
  key: Accessibility
  parent: Concepts
  label: "Change"
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Familiar web accessibility APIs in a platform-agnostic form.
:::

Accessibility in {{ site.name }} combines several separate web APIs into a cohesive system. Assistive technologies (e.g., VoiceOver, TalkBack screen readers) derive useful information about the structure, purpose, and interactivity of web apps from their [HTML elements][html-accessibility-url], attributes, and [ARIA in HTML][aria-in-html-url].

---

## Accessibility Props API

{{ site.name }} includes APIs for making accessible apps. (Note that for compatibility with existing React Native code, the React Native-specific `accessibility*` props are also supported.)

{% call macro.prop('aria-activedescendant', '?string') %}
Equivalent to [aria-activedescendant](https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant).
{% endcall %}

{% call macro.prop('aria-atomic', '?boolean') %}
Equivalent to [aria-atomic](https://www.w3.org/TR/wai-aria-1.2/#aria-atomic).
{% endcall %}

{% call macro.prop('aria-autocomplete', '?string') %}
Equivalent to [aria-autocomplete](https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete).
{% endcall %}

{% call macro.prop('aria-busy', '?boolean') %}
Equivalent to [aria-busy](https://www.w3.org/TR/wai-aria-1.2/#aria-busy).
{% endcall %}

{% call macro.prop('aria-checked', '?(boolean | "mixed")') %}
Equivalent to [aria-checked](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
{% endcall %}

{% call macro.prop('aria-colcount', '?number') %}
Equivalent to [aria-colcount](https://www.w3.org/TR/wai-aria-1.2/#aria-colcount).
{% endcall %}

{% call macro.prop('aria-colindex', '?number') %}
Equivalent to [aria-colindex](https://www.w3.org/TR/wai-aria-1.2/#aria-colindex).
{% endcall %}

{% call macro.prop('aria-colspan', '?number') %}
Equivalent to [aria-colspan](https://www.w3.org/TR/wai-aria-1.2/#aria-colspan).
{% endcall %}

{% call macro.prop('aria-controls', '?string') %}
Equivalent to [aria-controls](https://www.w3.org/TR/wai-aria-1.2/#aria-controls).
{% endcall %}

{% call macro.prop('aria-current', '?(boolean | "page" | "step" | "location" | "date" | "time")') %}
Equivalent to [aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current).
{% endcall %}

{% call macro.prop('aria-describedby', '?string') %}
Equivalent to [aria-describedby](https://www.w3.org/TR/wai-aria-1.2/#aria-describedby).
{% endcall %}

{% call macro.prop('aria-details', '?string') %}
Equivalent to [aria-details](https://www.w3.org/TR/wai-aria-1.2/#aria-details).
{% endcall %}

{% call macro.prop('aria-disabled', '?boolean') %}
Equivalent to [aria-disabled](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
{% endcall %}

{% call macro.prop('aria-errormessage', '?string') %}
Equivalent to [aria-errormessage](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage).
{% endcall %}

{% call macro.prop('aria-expanded', '?boolean') %}
Equivalent to [aria-expanded](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
{% endcall %}

{% call macro.prop('aria-flowto', '?string') %}
Equivalent to [aria-flowto](https://www.w3.org/TR/wai-aria-1.2/#aria-flowto).
{% endcall %}

{% call macro.prop('aria-haspopup', '?string') %}
Equivalent to [aria-haspopup](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup).
{% endcall %}

{% call macro.prop('aria-hidden', '?boolean') %}
Equivalent to [aria-hidden](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
{% endcall %}

{% call macro.prop('aria-invalid', '?boolean') %}
Equivalent to [aria-invalid](https://www.w3.org/TR/wai-aria-1.2/#aria-invalid).
{% endcall %}

{% call macro.prop('aria-keyshortcuts', '?string') %}
Equivalent to [aria-keyshortcuts](https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts).
{% endcall %}

{% call macro.prop('aria-label', '?string') %}
Equivalent to [aria-label](https://www.w3.org/TR/wai-aria-1.2/#aria-label).
{% endcall %}

{% call macro.prop('aria-labelledby', '?string') %}
Equivalent to [aria-labelledby](https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby).
{% endcall %}

{% call macro.prop('aria-level', '?number') %}
Equivalent to [aria-level](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
{% endcall %}

{% call macro.prop('aria-live', '?("assertive" | "off" | "polite")') %}
Equivalent to [aria-live](https://www.w3.org/TR/wai-aria-1.2/#aria-live).
{% endcall %}

{% call macro.prop('aria-modal', '?boolean') %}
Equivalent to [aria-modal](https://www.w3.org/TR/wai-aria-1.2/#aria-modal).
{% endcall %}

{% call macro.prop('aria-multiline', '?boolean') %}
Equivalent to [aria-multiline](https://www.w3.org/TR/wai-aria-1.2/#aria-multiline).
{% endcall %}

{% call macro.prop('aria-multiselectable', '?boolean') %}
Equivalent to [aria-multiselectable](https://www.w3.org/TR/wai-aria-1.2/#aria-multiselectable).
{% endcall %}

{% call macro.prop('aria-orientation', '?("horizontal" | "vertical")') %}
Equivalent to [aria-orientation](https://www.w3.org/TR/wai-aria-1.2/#aria-orientation).
{% endcall %}

{% call macro.prop('aria-owns', '?string') %}
Equivalent to [aria-owns](https://www.w3.org/TR/wai-aria-1.2/#aria-owns).
{% endcall %}

{% call macro.prop('aria-placeholder', '?string') %}
Equivalent to [aria-placeholder](https://www.w3.org/TR/wai-aria-1.2/#aria-placeholder).
{% endcall %}

{% call macro.prop('aria-posinset', '?number') %}
Equivalent to [aria-posinset](https://www.w3.org/TR/wai-aria-1.2/#aria-posinset).
{% endcall %}

{% call macro.prop('aria-pressed', '?boolean') %}
Equivalent to [aria-pressed](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
{% endcall %}

{% call macro.prop('aria-readonly', '?boolean') %}
Equivalent to [aria-readonly](https://www.w3.org/TR/wai-aria-1.2/#aria-readonly).
{% endcall %}

{% call macro.prop('aria-required', '?boolean') %}
Equivalent to [aria-required](https://www.w3.org/TR/wai-aria-1.2/#aria-required).
{% endcall %}

{% call macro.prop('role', '?string') %}
Equivalent to [role](https://www.w3.org/TR/wai-aria-1.2/#role_definitions).
{% endcall %}

{% call macro.prop('aria-roledescription', '?string') %}
Equivalent to [aria-roledescription](https://www.w3.org/TR/wai-aria-1.2/#aria-roledescription).
{% endcall %}

{% call macro.prop('aria-rowcount', '?number') %}
Equivalent to [aria-rowcount](https://www.w3.org/TR/wai-aria-1.2/#aria-rowcount).
{% endcall %}

{% call macro.prop('aria-rowindex', '?number') %}
Equivalent to [aria-rowindex](https://www.w3.org/TR/wai-aria-1.2/#aria-rowindex).
{% endcall %}

{% call macro.prop('aria-rowspan', '?number') %}
Equivalent to [aria-rowspan](https://www.w3.org/TR/wai-aria-1.2/#aria-rowspan).
{% endcall %}

{% call macro.prop('aria-selected', '?boolean') %}
Equivalent to [aria-selected](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).
{% endcall %}

{% call macro.prop('aria-setsize', '?number') %}
Equivalent to [aria-setsize](https://www.w3.org/TR/wai-aria-1.2/#aria-setsize).
{% endcall %}

{% call macro.prop('aria-sort', '?("ascending" | "descending" | "none" | "other")') %}
Equivalent to [aria-sort](https://www.w3.org/TR/wai-aria-1.2/#aria-sort).
{% endcall %}

{% call macro.prop('aria-valuemax', '?number') %}
Equivalent to [aria-valuemax](https://www.w3.org/TR/wai-aria-1.2/#aria-valuemax).
{% endcall %}

{% call macro.prop('aria-valuemin', '?number') %}
Equivalent to [aria-valuemin](https://www.w3.org/TR/wai-aria-1.2/#aria-valuemin).
{% endcall %}

{% call macro.prop('aria-valuenow', '?number') %}
Equivalent to [aria-valuenow](https://www.w3.org/TR/wai-aria-1.2/#aria-valuenow).
{% endcall %}

{% call macro.prop('aria-valuetext', '?string') %}
Equivalent to [aria-valuetext](https://www.w3.org/TR/wai-aria-1.2/#aria-valuetext).
{% endcall %}

---

## Accessibility patterns

### Links

The `Text` and `View` components can be rendered as links. If the `href` prop is set, the element will render `<a>` tags without altering the presentation of the element.

```jsx
<Text href="/" />
// <a href="/" ></a>
```

The `hrefAttrs` prop sets link-related attributes.

```jsx
const hrefAttrs = { download: true, rel: "nofollow", target: "blank" };

<Text
  href="/document.pdf"
  hrefAttrs={hrefAttrs}
/>
// <a download href="/document.pdf" rel="nofollow" target="_blank"></a>
```

### Keyboard focus

The `tabIndex` prop determines whether a component is user-focusable and appears in the keyboard tab flow. This prop should be used instead of the `accessible` (or `focusable` prop) found in React Native for Android/iOS, which is not implemented by React Native for Web/Windows/macOS.

```jsx
<View tabindex={0} />
// <div tabindex="0"></div>

<Text tabindex={-1} href="/" />
// <a href="/" tabindex="-1"></a>
```

:::callout
**Did you know?** Any element (including elements not in the keyboard tab flow) can be programmatically focused via `UIManager.focus(viewRef.current)`.
:::

### Accessible HTML

{{ site.name }} components express semantics exclusively via the `aria-*` props.

```jsx
<View
  aria-label="..."
  aria-pressed={false}
  id="abc"
  role="menuitem"
/>
/*
<div
  aria-label="..."
  aria-pressed="false"
  id="abc"
  role="menuitem"
/>
*/
```

### Semantic HTML

The value of the `role` prop is used to infer an [analogous HTML element][html-aria-url] where appropriate. This is done to rely on well-supported native mechanisms for encoding semantics and accessibility information.

```jsx
<View role="article">
  <Text role="paragraph">This is an article</Text>
</View>
/*
<article>
  <p>This is an article</p>
</article>
*/
```

If the `"heading"` role is combined with an `aria-level`, the equivalent HTML heading element is rendered. Otherwise, it is rendered as `<h1>`.

```jsx
<Text role="heading" /> /* <h1> */
<Text role="heading" aria-level={2} /> /* <h2> */
```

Note: Avoid changing `role` values over time or after user actions. Generally, accessibility APIs do not provide a means of notifying assistive technologies if a `role` changes.


[aria-in-html-url]: https://w3c.github.io/aria-in-html/
[html-accessibility-url]: http://www.html5accessibility.com/
[html-aria-url]: http://www.w3.org/TR/html-aria/
