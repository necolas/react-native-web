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

{{ site.name }} includes APIs for making accessible apps. The most common and well supported accessibility features of the Web are exposed as platform-agnostic `accessibility*` props.

{% call macro.prop('accessibilityActiveDescendant', '?string') %}
Equivalent to [aria-activedescendant](https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant).
{% endcall %}

{% call macro.prop('accessibilityAtomic', '?boolean') %}
Equivalent to [aria-atomic](https://www.w3.org/TR/wai-aria-1.2/#aria-atomic).
{% endcall %}

{% call macro.prop('accessibilityAutoComplete', '?string') %}
Equivalent to [aria-autocomplete](https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete).
{% endcall %}

{% call macro.prop('accessibilityBusy', '?boolean') %}
Equivalent to [aria-busy](https://www.w3.org/TR/wai-aria-1.2/#aria-busy).
{% endcall %}

{% call macro.prop('accessibilityChecked', '?(boolean | "mixed")') %}
Equivalent to [aria-checked](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
{% endcall %}

{% call macro.prop('accessibilityColumnCount', '?number') %}
Equivalent to [aria-colcount](https://www.w3.org/TR/wai-aria-1.2/#aria-colcount).
{% endcall %}

{% call macro.prop('accessibilityColumnIndex', '?number') %}
Equivalent to [aria-colindex](https://www.w3.org/TR/wai-aria-1.2/#aria-colindex).
{% endcall %}

{% call macro.prop('accessibilityColumnSpan', '?number') %}
Equivalent to [aria-colspan](https://www.w3.org/TR/wai-aria-1.2/#aria-colspan).
{% endcall %}

{% call macro.prop('accessibilityControls', '?string') %}
Equivalent to [aria-controls](https://www.w3.org/TR/wai-aria-1.2/#aria-controls).
{% endcall %}

{% call macro.prop('accessibilityCurrent', '?(boolean | "page" | "step" | "location" | "date" | "time")') %}
Equivalent to [aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current).
{% endcall %}

{% call macro.prop('accessibilityDescribedBy', '?string') %}
Equivalent to [aria-describedby](https://www.w3.org/TR/wai-aria-1.2/#aria-describedby).
{% endcall %}

{% call macro.prop('accessibilityDetails', '?string') %}
Equivalent to [aria-details](https://www.w3.org/TR/wai-aria-1.2/#aria-details).
{% endcall %}

{% call macro.prop('accessibilityDisabled', '?boolean') %}
Equivalent to [aria-disabled](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
{% endcall %}

{% call macro.prop('accessibilityErrorMessage', '?string') %}
Equivalent to [aria-errormessage](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage).
{% endcall %}

{% call macro.prop('accessibilityExpanded', '?boolean') %}
Equivalent to [aria-expanded](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
{% endcall %}

{% call macro.prop('accessibilityFlowTo', '?string') %}
Equivalent to [aria-flowto](https://www.w3.org/TR/wai-aria-1.2/#aria-flowto).
{% endcall %}

{% call macro.prop('accessibilityHasPopup', '?string') %}
Equivalent to [aria-haspopup](https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup).
{% endcall %}

{% call macro.prop('accessibilityHidden', '?boolean') %}
Equivalent to [aria-hidden](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
{% endcall %}

{% call macro.prop('accessibilityInvalid', '?boolean') %}
Equivalent to [aria-invalid](https://www.w3.org/TR/wai-aria-1.2/#aria-invalid).
{% endcall %}

{% call macro.prop('accessibilityKeyShortcuts', '?Array<string>') %}
Equivalent to [aria-keyshortcuts](https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts).
{% endcall %}

{% call macro.prop('accessibilityLabel', '?string') %}
Equivalent to [aria-label](https://www.w3.org/TR/wai-aria-1.2/#aria-label).
{% endcall %}

{% call macro.prop('accessibilityLabelledBy', '?string') %}
Equivalent to [aria-labelledby](https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby).
{% endcall %}

{% call macro.prop('accessibilityLevel', '?number') %}
Equivalent to [aria-level](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
{% endcall %}

{% call macro.prop('accessibilityLiveRegion', '?("assertive" | "off" | "polite")') %}
Equivalent to [aria-live](https://www.w3.org/TR/wai-aria-1.2/#aria-live).
{% endcall %}

{% call macro.prop('accessibilityModal', '?boolean') %}
Equivalent to [aria-modal](https://www.w3.org/TR/wai-aria-1.2/#aria-modal).
{% endcall %}

{% call macro.prop('accessibilityMultiline', '?boolean') %}
Equivalent to [aria-multiline](https://www.w3.org/TR/wai-aria-1.2/#aria-multiline).
{% endcall %}

{% call macro.prop('accessibilityMultiSelectable', '?boolean') %}
Equivalent to [aria-multiselectable](https://www.w3.org/TR/wai-aria-1.2/#aria-multiselectable).
{% endcall %}

{% call macro.prop('accessibilityOrientation', '?("horizontal" | "vertical")') %}
Equivalent to [aria-orientation](https://www.w3.org/TR/wai-aria-1.2/#aria-orientation).
{% endcall %}

{% call macro.prop('accessibilityOwns', '?string') %}
Equivalent to [aria-owns](https://www.w3.org/TR/wai-aria-1.2/#aria-owns).
{% endcall %}

{% call macro.prop('accessibilityPlaceholder', '?string') %}
Equivalent to [aria-placeholder](https://www.w3.org/TR/wai-aria-1.2/#aria-placeholder).
{% endcall %}

{% call macro.prop('accessibilityPosInSet', '?number') %}
Equivalent to [aria-posinset](https://www.w3.org/TR/wai-aria-1.2/#aria-posinset).
{% endcall %}

{% call macro.prop('accessibilityPressed', '?boolean') %}
Equivalent to [aria-pressed](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
{% endcall %}

{% call macro.prop('accessibilityReadOnly', '?boolean') %}
Equivalent to [aria-readonly](https://www.w3.org/TR/wai-aria-1.2/#aria-readonly).
{% endcall %}

{% call macro.prop('accessibilityRequired', '?boolean') %}
Equivalent to [aria-required](https://www.w3.org/TR/wai-aria-1.2/#aria-required).
{% endcall %}

{% call macro.prop('accessibilityRole', '?boolean') %}
Equivalent to [role](https://www.w3.org/TR/wai-aria-1.2/#role_definitions).
{% endcall %}

{% call macro.prop('accessibilityRoleDescription', '?string') %}
Equivalent to [aria-roledescription](https://www.w3.org/TR/wai-aria-1.2/#aria-roledescription).
{% endcall %}

{% call macro.prop('accessibilityRowCount', '?number') %}
Equivalent to [aria-rowcount](https://www.w3.org/TR/wai-aria-1.2/#aria-rowcount).
{% endcall %}

{% call macro.prop('accessibilityRowIndex', '?number') %}
Equivalent to [aria-rowindex](https://www.w3.org/TR/wai-aria-1.2/#aria-rowindex).
{% endcall %}

{% call macro.prop('accessibilityRowSpan', '?number') %}
Equivalent to [aria-rowspan](https://www.w3.org/TR/wai-aria-1.2/#aria-rowspan).
{% endcall %}

{% call macro.prop('accessibilitySelected', '?boolean') %}
Equivalent to [aria-selected](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).
{% endcall %}

{% call macro.prop('accessibilitySetSize', '?number') %}
Equivalent to [aria-setsize](https://www.w3.org/TR/wai-aria-1.2/#aria-setsize).
{% endcall %}

{% call macro.prop('accessibilitySort', '?("ascending" | "descending" | "none" | "other")') %}
Equivalent to [aria-sort](https://www.w3.org/TR/wai-aria-1.2/#aria-sort).
{% endcall %}

{% call macro.prop('accessibilityValueMax', '?number') %}
Equivalent to [aria-valuemax](https://www.w3.org/TR/wai-aria-1.2/#aria-valuemax).
{% endcall %}

{% call macro.prop('accessibilityValueMin', '?number') %}
Equivalent to [aria-valuemin](https://www.w3.org/TR/wai-aria-1.2/#aria-valuemin).
{% endcall %}

{% call macro.prop('accessibilityValueNow', '?number') %}
Equivalent to [aria-valuenow](https://www.w3.org/TR/wai-aria-1.2/#aria-valuenow).
{% endcall %}

{% call macro.prop('accessibilityValueText', '?string') %}
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

The `focusable` prop determines whether a component is user-focusable and appears in the keyboard tab flow. This prop should be used instead of the `accessible` prop found in React Native for Android/iOS, which is not implemented by React Native for Web/Windows/macOS.

```jsx
<View focusable={true} />
// <div tabindex="0"></div>

<Text focusable={false} href="/" />
// <a href="/" tabindex="-1"></a>
```

:::callout
**Did you know?** Any element (including elements not in the keybaord tab flow) can be programmatically focused via `UIManager.focus(viewRef.current)`.
:::

### Accessible HTML

{{ site.name }} components express semantics exclusively via the `accessibility*` props which are equivalent to `aria-*` attributes. For example, `accessibilityRole` is equivalent to the HTML `role` attribute, `accessibilityLabel` is equivalent to `aria-label`, etc. (Additional compatibility with React Native accessibility props is also included.)

```jsx
<View
  accessibilityLabel="..."
  accessibilityPressed={false}
  accessibilityRole="menuitem"
  nativeID="abc"
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

The value of the `accessibilityRole` prop is used to infer an [analogous HTML element][html-aria-url] where appropriate. This is done to rely on well-supported native mechanisms for encoding semantics and accessibility information.

```jsx
<View accessibilityRole="article">
  <Text accessibilityRole="paragraph">This is an article</Text>
</View>
/*
<article>
  <div role="paragraph">This is an article</div>
</article>
*/
```

The `"paragraph"` role isn't mapped to a `<p>` tag because it's an HTML conformance error to include block-level children within the element; both `Text` and `View` support block-level children.

If the `"heading"` role is combined with an `accessibilityLevel`, the equivalent HTML heading element is rendered. Otherwise, it is rendered as `<h1>`.

```jsx
<Text accessibilityRole="heading" /> /* <h1> */
<Text accessibilityRole="heading" accessibilityLevel={2} /> /* <h2> */
```

Note: Avoid changing `accessibilityRole` values over time or after user actions. Generally, accessibility APIs do not provide a means of notifying assistive technologies if a `role` changes.


[aria-in-html-url]: https://w3c.github.io/aria-in-html/
[html-accessibility-url]: http://www.html5accessibility.com/
[html-aria-url]: http://www.w3.org/TR/html-aria/
