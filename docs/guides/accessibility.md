# Accessibility

On the Web, assistive technologies derive useful information about the
structure, purpose, and interactivity of apps from their [HTML
elements][html-accessibility-url], attributes, and [ARIA in
HTML][aria-in-html-url].

The most common and best supported accessibility features of the Web are
exposed as the props: `accessible`, `accessibilityLabel`,
`accessibilityLiveRegion`, and `accessibilityRole`.

React Native for Web does not provide a way to directly control the rendered
HTML element. The `accessibilityRole` prop is used to infer an [analogous HTML
element][html-aria-url] to use in addition, where possible. While this may
contradict some ARIA recommendations, it also helps avoid certain HTML5
conformance errors and accessibility anti-patterns (e.g., giving a `heading`
role to a `button` element).

For example:

* `<View accessibilityRole='article' />` => `<article role='article' />`.
* `<View accessibilityRole='banner' />` => `<header role='banner' />`.
* `<View accessibilityRole='button' />` => `<button type='button' role='button' />`.
* `<Text accessibilityRole='link' href='/' />` => `<a role='link' href='/' />`.
* `<View accessibilityRole='main' />` => `<main role='main' />`.

See the component documentation for more details.

[aria-in-html-url]: https://w3c.github.io/aria-in-html/
[html-accessibility-url]: http://www.html5accessibility.com/
[html-aria-url]: http://www.w3.org/TR/html-aria/
