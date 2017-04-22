# View

`View` is the fundamental UI building block. It is a component that supports
style, layout with flexbox, and accessibility controls. It can be nested
inside another `View` and has 0-to-many children of any type.

Also, refer to React Native's documentation about the [Gesture Responder
System](http://facebook.github.io/react-native/releases/0.22/docs/gesture-responder-system.html).

Unsupported React Native props: `collapsable`, `onAccessibilityTap`, `onMagicTap`.

## Props

NOTE: `View` will transfer all other props to the rendered HTML element.

**accessibilityLabel**: ?string

Overrides the text that's read by a screen reader when the user interacts
with the element. (This is implemented using `aria-label`.)

See the [Accessibility guide](../guides/accessibility) for more information.

**accessibilityLiveRegion**: ?enum('assertive', 'none', 'polite')

Indicates to assistive technologies whether to notify the user when the view
changes. The values of this attribute are expressed in degrees of importance.
When regions are specified as `polite` (recommended), updates take low
priority. When regions are specified as `assertive`, assistive technologies
will interrupt and immediately notify the user. (This is implemented using
[`aria-live`](http://www.w3.org/TR/wai-aria/states_and_properties#aria-live).)

See the [Accessibility guide](../guides/accessibility) for more information.

(web) **accessibilityRole**: ?enum(roles)

Allows assistive technologies to present and support interaction with the view
in a manner that is consistent with user expectations for similar views of that
type. For example, marking a touchable view with an `accessibilityRole` of
`button`. (This is implemented using [ARIA roles](http://www.w3.org/TR/wai-aria/roles#role_definitions)).

See the [Accessibility guide](../guides/accessibility) for more information.

**accessible**: ?boolean

When `true`, indicates that the view is an accessibility element (i.e.,
focusable) and groups its child content. By default, all the touchable elements
and elements with `accessibilityRole` of `button` and `link` are accessible.
(This is implemented using `tabindex`.)

See the [Accessibility guide](../guides/accessibility) for more information.

**children**: ?element

Child content.

**hitSlop**: ?object

This defines how far a touch event can start away from the view (in pixels).
Typical interface guidelines recommend touch targets that are at least 30 - 40
points/density-independent pixels.

For example, if a touchable view has a height of `20` the touchable height can
be extended to `40` with `hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}`.

**importantForAccessibility**: ?enum('auto', 'no', 'no-hide-descendants', 'yes')

A value of `no` will remove the element from the tab flow.

A value of `no-hide-descendants` will hide the element and its children from
assistive technologies. (This is implemented using `aria-hidden`.)

See the [Accessibility guide](../guides/accessibility) for more information.

**onLayout**: ?function

Invoked on mount and layout changes with `{ nativeEvent: { layout: { x, y, width,
height } } }`, where `x` and `y` are the offsets from the parent node.

**onMoveShouldSetResponder**: ?function => boolean

Does this view want to "claim" touch responsiveness? This is called for every
touch move on the `View` when it is not the responder.

**onMoveShouldSetResponderCapture**: ?function => boolean

If a parent `View` wants to prevent a child `View` from becoming responder on a
move, it should have this handler return `true`.

**onResponderGrant**: ?function

The `View` is now responding to touch events. This is the time to highlight and
show the user what is happening.  For most touch interactions, you'll simply
want to wrap your component in `TouchableHighlight` or `TouchableOpacity`.

**onResponderMove**: ?function

The user is moving their finger.

**onResponderReject**: ?function

Another responder is already active and will not release it to the `View`
asking to be the responder.

**onResponderRelease**: ?function

Fired at the end of the touch.

**onResponderTerminate**: ?function

The responder has been taken from the `View`.

**onResponderTerminationRequest**: ?function

Some other `View` wants to become responder and is asking this `View` to
release its responder. Returning `true` allows its release.

**onStartShouldSetResponder**: ?function => boolean

Does this view want to become responder on the start of a touch?

**onStartShouldSetResponderCapture**: ?function => boolean

If a parent `View` wants to prevent a child `View` from becoming the responder
on a touch start, it should have this handler return `true`.

**pointerEvents**: ?enum('auto', 'box-only', 'box-none', 'none') = 'auto'

Controls whether the View can be the target of touch events. The enhanced
`pointerEvents` modes provided are not part of the CSS spec, therefore,
`pointerEvents` is excluded from `style`.

`box-none` is the equivalent of:

```css
.box-none { pointer-events: none }
.box-none * { pointer-events: auto }
```

`box-only` is the equivalent of:

```css
.box-only { pointer-events: auto }
.box-only * { pointer-events: none }
```

**style**: ?style

+ `alignContent`
+ `alignItems`
+ `alignSelf`
+ `animationDelay` ‡
+ `animationDirection` ‡
+ `animationDuration` ‡
+ `animationFillMode` ‡
+ `animationIterationCount` ‡
+ `animationName` ‡
+ `animationPlayState` ‡
+ `animationTimingFunction` ‡
+ `backfaceVisibility`
+ `backgroundAttachment` ‡
+ `backgroundClip` ‡
+ `backgroundColor`
+ `backgroundImage` ‡
+ `backgroundOrigin` ‡
+ `backgroundPosition` ‡
+ `backgroundRepeat` ‡
+ `backgroundSize` ‡
+ `borderColor` (single value)
+ `borderTopColor`
+ `borderBottomColor`
+ `borderRightColor`
+ `borderLeftColor`
+ `borderRadius` (single value)
+ `borderTopLeftRadius`
+ `borderTopRightRadius`
+ `borderBottomLeftRadius`
+ `borderBottomRightRadius`
+ `borderStyle` (single value)
+ `borderTopStyle`
+ `borderRightStyle`
+ `borderBottomStyle`
+ `borderLeftStyle`
+ `borderWidth` (single value)
+ `borderBottomWidth`
+ `borderLeftWidth`
+ `borderRightWidth`
+ `borderTopWidth`
+ `bottom`
+ `boxShadow` ‡
+ `boxSizing`
+ `clip` ‡
+ `cursor` ‡
+ `display`
+ `filter` ‡
+ `flex` (number)
+ `flexBasis`
+ `flexDirection`
+ `flexGrow`
+ `flexShrink`
+ `flexWrap`
+ `gridAutoColumns` ‡
+ `gridAutoFlow` ‡
+ `gridAutoRows` ‡
+ `gridColumnEnd` ‡
+ `gridColumnGap` ‡
+ `gridColumnStart` ‡
+ `gridRowEnd` ‡
+ `gridRowGap` ‡
+ `gridRowStart` ‡
+ `gridTemplateColumns` ‡
+ `gridTemplateRows` ‡
+ `gridTemplateAreas` ‡
+ `height`
+ `justifyContent`
+ `left`
+ `margin` (single value)
+ `marginBottom`
+ `marginHorizontal`
+ `marginLeft`
+ `marginRight`
+ `marginTop`
+ `marginVertical`
+ `maxHeight`
+ `maxWidth`
+ `minHeight`
+ `minWidth`
+ `opacity`
+ `order`
+ `outline` ‡
+ `outlineColor` ‡
+ `overflow`
+ `overflowX` ‡
+ `overflowY` ‡
+ `padding` (single value)
+ `paddingBottom`
+ `paddingHorizontal`
+ `paddingLeft`
+ `paddingRight`
+ `paddingTop`
+ `paddingVertical`
+ `perspective` ‡
+ `perspectiveOrigin` ‡
+ `position`
+ `right`
+ `shadowColor`
+ `shadowOffset`
+ `shadowOpacity`
+ `shadowRadius`
+ `top`
+ `transform`
+ `transformOrigin` ‡
+ `transitionDelay` ‡
+ `transitionDuration` ‡
+ `transitionProperty` ‡
+ `transitionTimingFunction` ‡
+ `userSelect` ‡
+ `visibility` ‡
+ `width`
+ `willChange` ‡
+ `zIndex`

‡ web only.

Default:

```js
{
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  position: 'relative'
};
```

(See [facebook/css-layout](https://github.com/facebook/css-layout)).

**testID**: ?string

Used to locate this view in end-to-end tests.

## Examples

```js
import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'

export default class ViewExample extends Component {
  render() {
    return (
      <View style={styles.row}>
        {
          ['1', '2', '3', '4', '5'].map((value, i) => {
            return <View children={value} key={i} style={styles.cell} />
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cell: {
    flexGrow: 1
  }
})
```
