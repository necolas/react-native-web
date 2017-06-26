# TextInput

Accessible single- and multi-line text input via a keyboard. Supports features
such as auto-complete, auto-focus, placeholder text, and event callbacks.

Note: some props are exclusive to or excluded from `multiline`.

Unsupported React Native props:
`onEndEditing`,
`clearButtonMode` (ios),
`enablesReturnKeyAutomatically` (ios),
`placeholderTextColor`,
`returnKeyType` (ios),
`selectionState` (ios),
`underlineColorAndroid` (android)

## Props

[...View props](./View.md)

**autoCapitalize**: ?enum('characters', 'none', 'sentences', 'words') = 'sentences'

Automatically capitalize certain characters (only available in Chrome and iOS Safari).

* `characters`: Automatically capitalize all characters.
* `none`: Completely disables automatic capitalization
* `sentences`: Automatically capitalize the first letter of sentences.
* `words`: Automatically capitalize the first letter of words.

(web) **autoComplete**: ?string

Indicates whether the value of the control can be automatically completed by
the browser. [Accepted values](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

**autoCorrect**: ?boolean = true

Automatically correct spelling mistakes  (only available in iOS Safari).

**autoFocus**: ?boolean = false

If `true`, focuses the input on `componentDidMount`. Only the first form element
in a document with `autofocus` is focused.

**blurOnSubmit**: ?boolean

If `true`, the text field will blur when submitted. The default value is `true`
for single-line fields and `false` for multiline fields. Note, for multiline
fields setting `blurOnSubmit` to `true` means that pressing return will blur
the field and trigger the `onSubmitEditing` event instead of inserting a
newline into the field.

**clearTextOnFocus**: ?boolean = false

If `true`, clears the text field automatically when focused.

**defaultValue**: ?string

Provides an initial value that will change when the user starts typing. Useful
for simple use-cases where you don't want to deal with listening to events and
updating the `value` prop to keep the controlled state in sync.

**editable**: ?boolean = true

If `false`, text is not editable (i.e., read-only).

**keyboardType**: enum('default', 'email-address', 'numeric', 'phone-pad', 'search', 'url', 'web-search') = 'default'

Determines which keyboard to open. (NOTE: Safari iOS requires an ancestral
`<form action>` element to display the `search` keyboard).

(Not available when `multiline` is `true`.)

**maxLength**: ?number

Limits the maximum number of characters that can be entered.

**multiline**: ?boolean = false

If true, the text input can be multiple lines.

**numberOfLines**: ?number = 2

Sets the number of lines for a multiline `TextInput`.

(Requires `multiline` to be `true`.)

**onBlur**: ?function

Callback that is called when the text input is blurred.

**onChange**: ?function

Callback that is called when the text input's text changes.

**onChangeText**: ?function

Callback that is called when the text input's text changes. The text is passed
as an argument to the callback handler.

**onFocus**: ?function

Callback that is called when the text input is focused.

**onKeyPress**: ?function

Callback that is called when a key is pressed. This will be called with `{
nativeEvent: { key: keyValue } }` where keyValue is 
'Enter', 'Backspace', 'Left arrow', 'Right arrow', 'Down arrow' and 'Up arrow' for
respective keys and the typed-in character otherwise including ' ' for space.
Modifier keys are also included in the nativeEvent. Fires before onChange
callbacks.

**onSelectionChange**: ?function

Callback that is called when the text input's selection changes. This will be called with
`{ nativeEvent: { selection: { start, end } } }`.

**onSubmitEditing**: ?function

Callback that is called when the keyboard's submit button is pressed.

**placeholder**: ?string

The string that will be rendered in an empty `TextInput` before text has been
entered.

**secureTextEntry**: ?boolean = false

If true, the text input obscures the text entered so that sensitive text like
passwords stay secure.

(Not available when `multiline` is `true`.)

**selection**: ?{ start: number, end: ?number }

The start and end of the text input's selection. Set start and end to the same value to position the cursor.

**selectTextOnFocus**: ?boolean = false

If `true`, all text will automatically be selected on focus.

**style**: ?style

+ ...[Text#style](./Text.md)
+ `resize` ‡

‡ web only.

**testID**: ?string

Used to locate this view in end-to-end tests.

**value**: ?string

The value to show for the text input. `TextInput` is a controlled component,
which means the native `value` will be forced to match this prop if provided.
Read about how [React form
components](https://facebook.github.io/react/docs/forms.html) work. To prevent
user edits to the value set `editable={false}`.

## Instance methods

**blur()**

Blur the underlying DOM input.

**clear()**

Clear the text from the underlying DOM input.

**focus()**

Focus the underlying DOM input.

**isFocused()**

Returns `true` if the input is currently focused; `false` otherwise.

## Examples

```js
import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'

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
