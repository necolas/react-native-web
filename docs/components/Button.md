# Button

A basic button component. Supports a minimal level of customization. You can
build your own custom button using `TouchableOpacity` or
`TouchableNativeFeedback`.

## Props

**accessibilityLabel**: string

Defines the text available to assistive technologies upon interaction with the
element. (This is implemented using `aria-label`.)

**color**: string

Background color of the button.

**disabled**: bool = false

If true, disable all interactions for this component

**onPress**: function

This function is called on press.

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
