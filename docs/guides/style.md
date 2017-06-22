# Style

React Native relies on JavaScript to define and resolve the styles of your
application. React Native for Web implements the React Native style API in a
way that avoids *all* the [problems with CSS at
scale](https://speakerdeck.com/vjeux/react-css-in-js):

1. No local variables
2. Implicit dependencies
3. No dead code elimination
4. No code minification
5. No sharing of constants
6. Non-deterministic resolution
7. No isolation

At the same time, it has several benefits:

1. Simple API and expressive subset of CSS
2. Generates CSS; the minimum required
3. Good runtime performance
4. Support for static and dynamic styles
5. Support for RTL layouts
6. Easy pre-rendering of critical CSS

## Defining styles

Styles should be defined outside of the component. Using `StyleSheet.create` is
optional but provides the best performance (by relying on generated CSS
stylesheets). Avoid creating unregistered style objects.

```js
const styles = StyleSheet.create({
  heading: {
    color: 'gray',
    fontSize: '2rem'
  },
  text: {
    marginTop: '1rem',
    margin: 10
  }
})
```

See the `style` documentation of individual components for supported properties.

## Using styles

All the React Native components accept a `style` property. The value can be a
registered object, a plain object, or an array.

```js
// registered object
<View style={styles.view} />

// plain object
<View style={{ transform: [ { translateX } ] }} />

// array of registered or plain objects
<View style={[ styles.container, this.props.style ]} />
```

The array syntax will merge styles from left-to-right as normal JavaScript
objects, and can be used to conditionally apply styles:

```js
<View style={[
  styles.container,
  this.state.active && styles.active
]} />
```

When styles are registered with `StyleSheet.create`, the return value is a
number and not a style object. This is important for performance optimizations,
but still allows you to merge styles in a deterministic manner at runtime. If
you need access to the underlying style objects you need to use
`StyleSheet.flatten` (but be aware that this is not the optimized path).

## Composing styles

To let other components customize the style of a component's children you can
expose a prop so styles can be explicitly passed into the component.

```js
class List extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    elementStyle: ViewPropTypes.style,
  }

  render() {
    return (
      <View style={this.props.style}>
        {elements.map((element) =>
          <View style={[ styles.element, this.props.elementStyle ]} />
        )}
      </View>
    );
  }
}
```

In another file:

```js
<List style={styles.list} elementStyle={styles.listElement} />
```

You also have much greater control over how styles are composed when compared
to using class names. For example, you may choose to accept a limited subset
of style props in the component's API, and control when they are applied.

## How styles are resolved

React Native style resolution is deterministic and slightly different from CSS.

In the following HTML/CSS example, the `.margin` selector is defined last in
the CSS and takes precedence over the previous rules, resulting in a margin of
`0, 0, 0, 0`.

```html
<style>
.marginTop { margin-top: 10px; }
.marginBottom { margin-bottom: 20px; }
.margin { margin: 0; }
</style>
<div class="marginTop marginBottom margin"></div>
```

But in React Native the most *specific* style property takes precedence,
resulting in margins of `10, 0, 20, 0`.

```js
const style = [
  { marginTop: 10 },
  { marginBottom: 20 },
  { margin: 0 }
];

const Box = () => <View style={style} />
```

## Implementation details

React Native for Web transforms React Native styles into React DOM styles. Any
styles defined using `StyleSheet.create` will ultimately be rendered using CSS
class names.

React Native for Web introduced a novel strategy to achieve this. Each rule is
broken down into declarations, properties are expanded to their long-form, and
the resulting key-value pairs are mapped to unique "atomic CSS" class names.

Input:

```js
const Box = () => <View style={styles.box} />

const styles = StyleSheet.create({
  box: {
    margin: 0
  }
});
```

Output:

```html
<style>
.rn-1mnahxq { margin-top: 0px; }
.rn-61z16t { margin-right: 0px; }
.rn-p1pxzi { margin-bottom: 0px; }
.rn-11wrixw { margin-left: 0px; }
</style>

<div class="rn-156q2ks rn-61z16t rn-p1pxzi rn-11wrixw"></div>
```

This ensures that CSS order doesn't impact rendering and CSS rules are
efficiently deduplicated. Rather than the total CSS growing in proportion to
the number of *rules*, it grows in proportion to the number of *unique
declarations*. As a result, the DOM style sheet is only written to when new
unique declarations are defined and it is usually small enough to be
pre-rendered and inlined.

Class names are deterministic, which means that the resulting CSS and HTML is
consistent across builds – important for large apps using code-splitting and
deploying incremental updates.

At runtime registered styles are resolved to DOM style props and memoized.
Any dynamic styles that contain declarations previously registered as static
styles can also be converted to CSS class names. Otherwise, they render as
inline styles.

All this allows React Native for Web to support the rich functionality of React
Native styles (including RTL layouts and `setNativeProps`) while providing one
of the [fastest](https://github.com/necolas/react-native-web/blob/master/benchmarks/README.md),
safest, and most efficient styles-in-JavaScript solutions.

## FAQs

### What about Media Queries?

`StyleSheet.create` is a way of defining the styles your application requires;
it does not concern itself with _where_ or _when_ those styles are applied to
elements.

Media Queries may not be most appropriate for component-based designs. React
Native provides the `Dimensions` API and `onLayout` props.  If you do need Media
Queries, using the `matchMedia` DOM API has the benefit of allowing you to swap
out entire components, not just styles. There are also many React libraries
wrapping JavaScript Media Query API's, e.g.,
[react-media](https://github.com/reacttraining/react-media),
[react-media-queries](https://github.com/bloodyowl/react-media-queries),
[media-query-fascade](https://github.com/tanem/media-query-facade), or
[react-responsive](https://github.com/contra/react-responsive).

### What about pseudo-classes and pseudo-elements?

Pseudo-classes like `:hover` and `:focus` can be implemented with events (e.g.
`onFocus`). Pseudo-elements are not supported; elements should be used instead.

### Do I need a CSS reset?

No. React Native for Web includes a very small CSS reset that removes unwanted
User Agent styles from (pseudo-)elements beyond the reach of React (e.g.,
`html`, `body`) or inline styles (e.g., `::-moz-focus-inner`). The rest is
handled at the component-level.

### What about using Dev Tools?

React Dev Tools supports inspecting and editing of React Native styles. It's
recommended that you rely more on React Dev Tools and live/hot-reloading rather
than inspecting and editing the DOM directly.
