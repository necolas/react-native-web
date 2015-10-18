# StyleSheet

React Native for Web will automatically vendor-prefix styles applied to the
libraries components. The `StyleSheet` abstraction converts predefined styles
to CSS without a compile-time step. Some styles cannot be resolved outside of
the render loop and are applied as inline styles.

The `style`-to-`className` conversion strategy is optimized to minimize the
amount of CSS required. Unique declarations are defined using "atomic" CSS – a
unique class name for a unique declaration.

React Native for Web includes a CSS reset to remove unwanted user agent styles
from elements and pseudo-elements beyond the reach of React (e.g., `html` and
`body`).

Create a new StyleSheet:

```
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
})
```

Use styles:

```js
<View style={styles.container}>
  <Text
    style={{
      ...styles.title,
      ...(this.props.isActive && styles.activeTitle)
    }}
  />
</View>
```

Render styles on the server or in the browser:

```js
StyleSheet.renderToString()
```

## Methods

**create**(obj: {[key: string]: any})

**renderToString**()

## Strategy

Mapping entire `style` objects to CSS rules can lead to increasingly large CSS
files. Each new component adds new rules to the stylesheet.

![](../static/styling-strategy.png)

React Native for Web uses an alternative strategy: mapping declarations to
declarations.

For example:

```js
<View style={styles.root}>...</View>

const styles = StyleSheet.create({
  root: {
    background: 'transparent',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  }
})
```

Yields (in development):

```html
<div className="background:transparent display:flex flexGrow:1 justifyContent:center">...</div>
```

And is backed by the following CSS:

```css
.background\:transparent {background:transparent;}
.display\:flex {display:flex;}
.flexGrow\:1 {flex-grow:1;}
.justifyContext\:center {justify-content:center;}
```

In production the class names are obfuscated.

(CSS libraries like [Atomic CSS](http://acss.io/),
[Basscss](http://www.basscss.com/), [SUIT CSS](https://suitcss.github.io/), and
[tachyons](http://tachyons.io/) are attempts to limit style scope and limit
stylesheet growth in a similar way. But they're CSS utility libraries, each with a
particular set of classes and features to learn. All of them require developers
to manually connect CSS classes for given styles.)

## Media Queries, pseudo-classes, and pseudo-elements

Media Queries in JavaScript can be used to modify the render tree and styles.
This has the benefit of co-locating breakpoint-specific DOM and style changes.

Pseudo-classes like `:hover` and `:focus` can be replaced with JavaScript
events.

Pseudo-elements are not supported.
