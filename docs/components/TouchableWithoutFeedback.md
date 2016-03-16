# TouchableWithoutFeedback

Do not use unless you have a very good reason. All the elements that respond to
press should have a visual feedback when touched. This is one of the primary
reason a "web" app doesn't feel "native".

**NOTE: `TouchableWithoutFeedback` supports only one child**. If you wish to have
several child components, wrap them in a View.

## Props

**accessibilityLabel**: string

Overrides the text that's read by the screen reader when the user interacts
with the element.

(web) **accessibilityRole**: oneOf(roles) = 'button'

Allows assistive technologies to present and support interaction with the view

**accessible**: bool = true

When `false`, the view is hidden from screenreaders.

**delayLongPress**: number

Delay in ms, from `onPressIn`, before `onLongPress` is called.

**delayPressIn**: number

Delay in ms, from the start of the touch, before `onPressIn` is called.

**delayPressOut**: number

Delay in ms, from the release of the touch, before `onPressOut` is called.

**disabled**: bool

If true, disable all interactions for this component.

**hitSlop**: `{top: number, left: number, bottom: number, right: number}`

This defines how far your touch can start away from the button. This is added
to `pressRetentionOffset` when moving off of the button. **NOTE**: The touch
area never extends past the parent view bounds and the z-index of sibling views
always takes precedence if a touch hits two overlapping views.

**onLayout**: function

Invoked on mount and layout changes with.

`{nativeEvent: {layout: {x, y, width, height}}}`

**onLongPress**: function

**onPress**: function

Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock).

**onPressIn**: function

**onPressOut**: function

**pressRetentionOffset**: `{top: number, left: number, bottom: number, right: number}`

When the scroll view is disabled, this defines how far your touch may move off
of the button, before deactivating the button. Once deactivated, try moving it
back and you'll see that the button is once again reactivated! Move it back and
forth several times while the scroll view is disabled. Ensure you pass in a
constant to reduce memory allocations.
