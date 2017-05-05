# Button

A basic button component. Supports a minimal level of customization. You can
build your own custom button using `TouchableOpacity` or
`TouchableNativeFeedback`.

## Props

**accessibilityLabel**: ?string

Overrides the text that's read by a screen reader when the user interacts
with the element.

**color**: ?string

Background color of the button.

**disabled**: ?boolean

If `true`, disable all interactions for this element.

**onPress**: function

This function is called on press.

**testID**: ?string

Used to locate this view in end-to-end tests.

**title**: string

Text to display inside the button.

## Examples

```js
<Button
  accessibilityLabel="Learn more about this purple button"
  color="#841584"
  onPress={onPressLearnMore}
  title="Learn More"
/>
```
