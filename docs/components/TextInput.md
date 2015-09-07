# TextInput

Accessible single- and multi-line text input via a keyboard. Supports features
such as auto-complete, auto-focus, placeholder text, and event callbacks.

Note: some props are exclusive to or excluded from `multiline`.

## Props

**autoComplete** bool

Indicates whether the value of the control can be automatically completed by the browser.

**autoFocus** bool

If true, focuses the input on `componentDidMount`. Only the first form element
in a document with `autofocus` is focused. Default: `false`.

**defaultValue** string

Provides an initial value that will change when the user starts typing. Useful
for simple use-cases where you don't want to deal with listening to events and
updating the `value` prop to keep the controlled state in sync.

**editable** bool

If false, text is not editable. Default: `true`.

**keyboardType** oneOf('default', 'email', 'numeric', 'search', 'tel', 'url')

Determines which keyboard to open, e.g. `email`. Default: `default`. (Not
available when `multiline` is `true`.)

**multiline** bool

If true, the text input can be multiple lines. Default: `false`.

**onBlur** function

Callback that is called when the text input is blurred.

**onChange** function

Callback that is called when the text input's text changes.

**onChangeText** function

Callback that is called when the text input's text changes. Changed text is
passed as an argument to the callback handler.

**onFocus** function

Callback that is called when the text input is focused.

**placeholder** string

The string that will be rendered before text input has been entered.

**placeholderTextColor** string

The text color of the placeholder string.

**secureTextEntry** bool

If true, the text input obscures the text entered so that sensitive text like
passwords stay secure. Default: `false`. (Not available when `multiline` is `true`.)

**style** style

[View](View.md) style

+ `color`
+ `direction`
+ `fontFamily`
+ `fontSize`
+ `fontStyle`
+ `fontWeight`
+ `letterSpacing`
+ `lineHeight`
+ `textAlign`
+ `textDecoration`
+ `textTransform`

**testID** string

Used to locate this view in end-to-end tests.

## Examples

```js
import React, { TextInput } from 'react-native-web'

const { Component, PropTypes } = React

class AppTextInput extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <TextInput />
    );
  }
}

const styles = {
}
```
