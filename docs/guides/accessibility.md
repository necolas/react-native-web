# Accessibility

On the Web, assistive technologies (e.g., VoiceOver, TalkBack screen readers)
derive useful information about the structure, purpose, and interactivity of
apps from their [HTML elements][html-accessibility-url], attributes, and [ARIA
in HTML][aria-in-html-url]. React Native for Web includes APIs designed to
provide developers with support for making apps more accessible. The most
common and best supported accessibility features of the Web are exposed as the
props: `accessible`, `accessibilityLabel`, `accessibilityLiveRegion`,
`accessibilityRole`, and `importantForAccessibility`.

## Accessibility properties

### accessible

When `true`, indicates that the view is an accessibility element. When a view
is an accessibility element, it groups its children into a single focusable
component. By default, all touchable elements, buttons, and links are
"accessible". Prefer using `accessibilityRole` (e.g., `button`, `link`) to
create focusable HTML elements wherever possible. On web, `accessible={true}`
is implemented using `tabIndex`.

### accessibilityLabel

When a view is marked as `accessible`, it is a good practice to set an
`accessibilityLabel` on the view, so that people who use screen readers know
what element they have selected. On web, `accessibilityLabel` is implemented
using `aria-label`.

```
<TouchableOpacity accessibilityLabel={'Tap me!'} accessible={true} onPress={this._onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableOpacity>
```

### accessibilityRole

In some cases, we also want to alert the end user of the type of selected
component (i.e., that it is a “button”). To provide more context to screen
readers, you should specify the `accessibilityRole` property. (Note that React
Native for Web also provides a compatibility mapping of equivalent
`accessibilityTraits` and `accessibilityComponentType` values to
`accessibilityRole`).

The `accessibilityRole` prop is used to infer an [analogous HTML
element][html-aria-url] and ARIA `role`, where possible. In most cases, both
the element and ARIA `role` are rendered. While this may contradict some ARIA
recommendations, it also helps avoid certain HTML5 conformance errors and
accessibility anti-patterns (e.g., giving a `heading` role to a `button`
element) and browser bugs.

For example:

* `<View accessibilityRole='article' />` => `<article role='article' />`.
* `<View accessibilityRole='banner' />` => `<header role='banner' />`.
* `<View accessibilityRole='button' />` => `<div role='button' tabIndex='0' />`.
* `<Text accessibilityRole='label' />` => `<label />`.
* `<Text accessibilityRole='link' href='/' />` => `<a role='link' href='/' />`.
* `<View accessibilityRole='main' />` => `<main role='main' />`.

In the example below, the `TouchableHighlight` is announced by screen
readers as a button.

```js
<TouchableHighlight accessibilityRole="button" onPress={this._handlePress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableHighlight>
```

Note: The `button` role is not implemented using the native `button` element
due to browsers limiting the use of flexbox layout on its children.

Note: Avoid changing `accessibilityRole` values over time or after user
actions. Generally, accessibility APIs do not provide a means of notifying
assistive technologies of a `role` value change.

### accessibilityLiveRegion

When components dynamically change we may need to inform the user.  The
`accessibilityLiveRegion` property serves this purpose and can be set to
`none`, `polite` and `assertive`. On web, `accessibilityLiveRegion` is
implemented using `aria-live`.

* `none`: Accessibility services should not announce changes to this view.
* `polite`: Accessibility services should announce changes to this view.
* `assertive`: Accessibility services should interrupt ongoing speech to immediately announce changes to this view.

```
<TouchableWithoutFeedback onPress={this._addOne}>
  <View style={styles.embedded}>
    <Text>Click me</Text>
  </View>
</TouchableWithoutFeedback>

<Text accessibilityLiveRegion="polite">
  Clicked {this.state.count} times
</Text>
```

In the above example, method `_addOne` changes the `state.count` variable. As
soon as an end user clicks the `TouchableWithoutFeedback`, screen readers
announce text in the `Text` view because of its
`accessibilityLiveRegion="polite"` property.

### importantForAccessibility

The `importantForAccessibility` property controls if a view appears in the
accessibility tree and if it is reported to accessibility services. On web, a
value of `no` will remove a focusable element from the tab flow, and a value of
`no-hide-descendants` will also hide the entire subtree from assistive
technologies (this is implemented using `aria-hidden`).

### Other

Other ARIA properties can be set via [direct
manipulation](./direct-manipulation.md) or props (this may change in the
future).

[aria-in-html-url]: https://w3c.github.io/aria-in-html/
[html-accessibility-url]: http://www.html5accessibility.com/
[html-aria-url]: http://www.w3.org/TR/html-aria/
