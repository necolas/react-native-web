# StyleSheet

The `StyleSheet` abstraction converts predefined styles to (vendor-prefixed)
CSS without requiring a compile-time step. Some styles cannot be resolved
outside of the render loop and are applied as inline styles. Read more about to
[how style your application](docs/guides/style).

## Methods

**create**(obj: {[key: string]: any})

Each key of the object passed to `create` must define a style object.

**flatten**: function

Flattens an array of styles into a single style object.

**render**: function

Returns a React `<style>` element for use in server-side rendering.

## Properties

**absoluteFill**: number

A very common pattern is to create overlays with position absolute and zero positioning,
so `absoluteFill` can be used for convenience and to reduce duplication of these repeated
styles.

```js
<View style={StyleSheet.absoluteFill} />
```

**absoluteFillObject**: object

Sometimes you may want `absoluteFill` but with a couple tweaks - `absoluteFillObject` can be
used to create a customized entry in a `StyleSheet`, e.g.:

```js
const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    top: 10
  }
})
```

**hairlineWidth**: number

## Example

```js
<View style={styles.container}>
  <Text
    children={'Title text'}
    style={[
      styles.title,
      this.props.isActive && styles.activeTitle
    ]}
  />
</View>

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
  }
})
```
