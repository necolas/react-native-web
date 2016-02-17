# NativeMethods

React Native for Web provides several methods to directly access the underlying
DOM node. This can be useful in cases when you want to focus a view or measure
its on-screen dimensions, for example.

The methods described are available on most of the default components provided
by React Native for Web. Note, however, that they are *not* available on the
composite components that you define in your own app. For more information, see
[Direct Manipulation](../guides/direct-manipulation.md).

## Methods

**blur**()

Removes focus from an input or view. This is the opposite of `focus()`.

**focus**()

Requests focus for the given input or view. The exact behavior triggered will
depend the type of view.

**measure**(callback: (x, y, width, height, pageX, pageY) => void)

For a given view, `measure` determines the offset relative to the parent view,
width, height, and the offset relative to the viewport. Returns the values via
an async callback.

Note that these measurements are not available until after the rendering has
been completed.

**measureLayout**(relativeToNativeNode: DOMNode, onSuccess: (x, y, width, height) => void)

Like `measure`, but measures the view relative to another view, specified as
`relativeToNativeNode`. This means that the returned `x`, `y` are relative to
the origin `x`, `y` of the ancestor view.

**setNativeProps**(nativeProps: Object)

This function sends props straight to the underlying DOM node. See the [direct
manipulation](../guides/direct-manipulation.md) guide for cases where
`setNativeProps` should be used.
