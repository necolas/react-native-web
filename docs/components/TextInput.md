# TextInput

Accessible single- and multi-line text input via a keyboard. Supports features
such as auto-complete, auto-focus, placeholder text, and event callbacks.

Note: some props are exclusive to or excluded from `multiline`.

Unsupported React Native props:
`autoCapitalize`,
`autoCorrect`,
`onEndEditing`,
`onSubmitEditing`,
`clearButtonMode` (ios),
`enablesReturnKeyAutomatically` (ios),
`returnKeyType` (ios),
`selectionState` (ios),
`textAlign` (android),
`textAlignVertical` (android),
`underlineColorAndroid` (android)

## Props

(web) **accessibilityLabel**: string

Defines the text label available to assistive technologies upon interaction
with the element. (This is implemented using `aria-label`.)

(web) **autoComplete**: bool = false

Indicates whether the value of the control can be automatically completed by the browser.

**autoFocus**: bool = false

If true, focuses the input on `componentDidMount`. Only the first form element
in a document with `autofocus` is focused.

**clearTextOnFocus**: bool = false

If `true`, clears the text field automatically when focused.

**defaultValue**: string

Provides an initial value that will change when the user starts typing. Useful
for simple use-cases where you don't want to deal with listening to events and
updating the `value` prop to keep the controlled state in sync.

**editable**: bool = true

If `false`, text is not editable (i.e., read-only).

**keyboardType**: oneOf('default', 'email-address', 'numeric', 'phone-pad', 'search', 'url', 'web-search') = 'default'

Determines which keyboard to open. (NOTE: Safari iOS requires an ancestral
`<form action>` element to display the `search` keyboard).

(Not available when `multiline` is `true`.)

**maxLength**: number

Limits the maximum number of characters that can be entered.

(web) **maxNumberOfLines**: number = numberOfLines

Limits the maximum number of lines for a multiline `TextInput`.

(Requires `multiline` to be `true`.)

**multiline**: bool = false

If true, the text input can be multiple lines.

**numberOfLines**: number = 2

Sets the initial number of lines for a multiline `TextInput`.

(Requires `multiline` to be `true`.)

**onBlur**: function

Callback that is called when the text input is blurred.

**onChange**: function

Callback that is called when the text input's text changes.

**onChangeText**: function

Callback that is called when the text input's text changes. The text is passed
as an argument to the callback handler.

**onFocus**: function

Callback that is called when the text input is focused.

**onLayout**: function

TODO

(web) **onSelectionChange**: function

Callback that is called when the text input's selection changes. The following
object is passed as an argument to the callback handler.

```js
{
  selectionDirection,
  selectionEnd,
  selectionStart,
  nativeEvent
}
```

**placeholder**: string

The string that will be rendered in an empty `TextInput` before text has been
entered.

**placeholderTextColor**: string

The text color of the placeholder string.

**secureTextEntry**: bool = false

If true, the text input obscures the text entered so that sensitive text like
passwords stay secure.

(Not available when `multiline` is `true`.)

**selectTextOnFocus**: bool = false

If `true`, all text will automatically be selected on focus.

**style**: style

+ ...[Text#style](Text.md)
+ `outline`

**testID**: string

Used to locate this view in end-to-end tests.

**value**: string

The value to show for the text input. `TextInput` is a controlled component,
which means the native `value` will be forced to match this prop if provided.
Read about how [React form
components](https://facebook.github.io/react/docs/forms.html) work. To prevent
user edits to the value set `editable={false}`.

## Examples

```js
import React, { Component, StyleSheet, TextInput } from 'react-native-web'

export default class TextInputExample extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { isFocused: false }
  }

  _onBlur(e) {
    this.setState({ isFocused: false })
  }

  _onFocus(e) {
    this.setState({ isFocused: true })
  }

  render() {
    return (
      <TextInput
        accessibilityLabel='Write a status update'
        maxNumberOfLines={5}
        multiline
        numberOfLines={2}
        onBlur={this._onBlur.bind(this)}
        onFocus={this._onFocus.bind(this)}
        placeholder={`What's happening?`}
        style={[
          styles.default
          this.state.isFocused && styles.focused
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  default: {
    borderColor: 'gray',
    borderBottomWidth: 2
  },
  focused: {
    borderColor: 'blue'
  }
})
```
