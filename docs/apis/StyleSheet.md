# StyleSheet

React Native for Web will automatically vendor-prefix styles applied to the
library's components. The `StyleSheet` abstraction converts predefined styles
to CSS without a compile-time step. Some styles cannot be resolved outside of
the render loop and are applied as inline styles.

Create a new StyleSheet:

```js
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

**destroy**()

Clears all style information.

**renderToString**()

Renders a CSS Style Sheet.

## About

### Strategy

React Native for Web uses a `style`-to-`className` conversion strategy that is
designed to avoid issues arising from the [7 deadly sins of
CSS](https://speakerdeck.com/vjeux/react-css-in-js):

1. Global namespace
2. Dependency hell
3. Dead code elimination
4. Code minification
5. Sharing constants
6. Non-deterministic resolution
7. Breaking isolation

The strategy also minimizes the amount of generated CSS, making it more viable
to inline the style sheet when pre-rendering pages on the server. There is one
unique selector per unique style _declaration_.

```js
// definition
{
  heading: {
    color: 'gray',
    fontSize: '2rem'
  },
  text: {
    color: 'gray',
    fontSize: '1.25rem'
  }
}

// css
//
// .a { color: gray; }
// .b { font-size: 2rem; }
// .c { font-size: 1.25rem; }
```

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
style sheet growth in a similar way. But they're CSS utility libraries, each with a
particular set of classes and features to learn. All of them require developers
to manually connect CSS classes for given styles.)

### Media Queries, pseudo-classes, and pseudo-elements

Media Queries in JavaScript can be used to modify the render tree and styles.
This has the benefit of co-locating breakpoint-specific DOM and style changes.

Pseudo-classes like `:hover` and `:focus` can be replaced with JavaScript
events.

Pseudo-elements are not supported.

### Reset

React Native for Web includes a very small CSS reset taken from
[normalize.css](https://necolas.github.io/normalize.css/). It removes unwanted
User Agent styles from (pseudo-)elements beyond the reach of React (e.g.,
`html`, `body`) or inline styles (e.g., `::-moz-focus-inner`).

```css
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
```
