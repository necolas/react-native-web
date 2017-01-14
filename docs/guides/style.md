# Style

React Native for Web relies on JavaScript to define styles for your
application. This allows you to avoid issues arising from the [7 deadly sins of
CSS](https://speakerdeck.com/vjeux/react-css-in-js):

1. Global namespace
2. Dependency hell
3. No dead code elimination
4. No code minification
5. No sharing of constants
6. Non-deterministic resolution
7. Lack of isolation

## Defining styles

Styles should be defined outside of the component:

```js
class Example extends React.Component {}

const styles = StyleSheet.create({
  heading: {
    color: 'gray',
    fontSize: '2rem'
  },
  text: {
    color: 'gray',
    fontSize: '1.25rem'
  }
})
```

Using `StyleSheet.create` is optional but provides the best performance
(`style` is resolved to CSS stylesheets). Avoid creating unregistered style
objects.

The attribute names and values are a subset of CSS. See the `style`
documentation of individual components.

## Using styles

All the React Native components accept a `style` attribute.

```js
<Text style={styles.text} />
<View style={styles.view} />
```

A common pattern is to conditionally add style based on a condition:

```js
// either
<View style={[
  styles.base,
  this.state.active && styles.active
]} />
```

## Composing styles

In order to let a call site customize the style of your component children, you
can pass styles around. Use `View.propTypes.style` and `Text.propTypes.style` in
order to make sure only valid styles are being passed.

```js
class List extends React.Component {
  static propTypes = {
    style: View.propTypes.style,
    elementStyle: View.propTypes.style,
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
of style props in the component's API, and control when they are applied:

```js
class List extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    // limit which styles are accepted
    style: React.PropTypes.shape({
      borderColor: View.propTypes.borderColor,
      borderWidth: View.propTypes.borderWidth
    })
  }

  render() {
    return (
      <View
        children={children}
        style={[
          this.props.style,
          // override border-color when scrolling
          isScrolling && { borderColor: 'transparent' }
        ]}
      />
    )
  }
}
```

## Media Queries

`StyleSheet.create` is a way of defining the styles your application requires;
it does not concern itself with _where_ or _when_ those styles are applied to
elements.

There are various React libraries wrapping JavaScript Media Query API's, e.g.,
[react-media-queries](https://github.com/bloodyowl/react-media-queries),
[media-query-fascade](https://github.com/tanem/media-query-facade), or
[react-responsive](https://github.com/contra/react-responsive). This has the
benefit of co-locating breakpoint-specific DOM and style changes.

## Pseudo-classes and pseudo-elements

Pseudo-classes like `:hover` and `:focus` can be implemented with events (e.g.
`onFocus`). Pseudo-elements are not supported; elements should be used instead.

### Reset

You **do not** need to include a CSS reset or
[normalize.css](https://necolas.github.io/normalize.css/).

React Native for Web includes a very small CSS reset taken from normalize.css.
It removes unwanted User Agent styles from (pseudo-)elements beyond the reach
of React (e.g., `html`, `body`) or inline styles (e.g., `::-moz-focus-inner`).
