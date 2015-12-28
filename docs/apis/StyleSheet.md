# StyleSheet

The `StyleSheet` abstraction converts predefined styles to (vendor-prefixed)
CSS without requiring a compile-time step. Some styles cannot be resolved
outside of the render loop and are applied as inline styles. Read more about to
[how style your application](docs/guides/style).

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
    style={[
      styles.title,
      this.props.isActive && styles.activeTitle
    ]}
  />
</View>
```

## Methods

**create**(obj: {[key: string]: any})
