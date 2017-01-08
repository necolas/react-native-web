# Direct manipulation

It is sometimes necessary to make changes directly to a component without using
state/props to trigger a re-render of the entire subtree – in the browser, this
is done by directly modifying a DOM node. `setNativeProps` is the React Native
equivalent to setting properties directly on a DOM node. Use direct
manipulation when frequent re-rendering creates a performance bottleneck. Direct
manipulation will not be a tool that you reach for frequently.

## `setNativeProps` and `shouldComponentUpdate`

`setNativeProps` is imperative and stores state in the native layer (DOM,
UIView, etc.) and not within your React components, which makes your code more
difficult to reason about. Before you use it, try to solve your problem with
`setState` and `shouldComponentUpdate`.

## Avoiding conflicts with the render function

If you update a property that is also managed by the render function, you might
end up with some unpredictable and confusing bugs because anytime the component
re-renders and that property changes, whatever value was previously set from
`setNativeProps` will be completely ignored and overridden.

## Why use `setNativeProps` on Web?

Using `setNativeProps` in web-specific code is required when making changes to
`className` or `style`, as these properties are controlled by React Native for
Web and setting them directly may cause unintended rendering issues.

```js
setOpacityTo(value) {
  this._childElement.setNativeProps({
    style: { opacity: value }
  })
}
```

## Composite components and `setNativeProps`

Composite components are not backed by a DOM node, so you cannot call
`setNativeProps` on them. Consider this example:

```js
const MyButton = (props) => (
  <View>
    <Text>{props.label}</Text>
  </View>
)

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
)
```

If you run this you will immediately see this error: `Touchable` child must
either be native or forward `setNativeProps` to a native component. This occurs
because `MyButton` isn't directly backed by a native view whose opacity should
be set. You can think about it like this: if you define a component with
`React.Component/createClass` you would not expect to be able to set a style
prop on it and have that work - you would need to pass the style prop down to a
child, unless you are wrapping a native component. Similarly, we are going to
forward `setNativeProps` to a native-backed child component.

## Forward `setNativeProps` to a child

All we need to do is provide a `setNativeProps` method on our component that
calls `setNativeProps` on the appropriate child with the given arguments.

```js
class MyButton extends React.Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._root = component}>
        <Text>{this.props.label}</Text>
      </View>
    )
  }
}
```

You can now use `MyButton` inside of `TouchableOpacity`!

## `setNativeProps` to clear `TextInput` value

Another very common use case of `setNativeProps` is to clear the value of a
`TextInput`. For example, the following code demonstrates clearing the input
when you tap a button:

```js
class App extends React.Component {
  _handlePress() {
    this._textInput.setNativeProps({ text: '' })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref={component => this._textInput = component}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Text>Clear text</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
```
