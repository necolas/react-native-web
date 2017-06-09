# Dimensions

Note: dimensions may change (e.g due to device rotation) so any rendering logic
or styles that depend on these constants should try to call this function on
every render (rather than caching the value) or listen to the `change` event.

## Methods

static **get**(dimension: string)

Get a dimension (e.g., `"window"` or `"screen"`).

Example: `const { height, width } = Dimensions.get('window')`

static **addEventListener**(type, handler)

Add an event handler. Supported events:

* `change`: Fires when a property within the `Dimensions` object changes. The argument to the event handler is an object with `window` and `screen ` properties whose values are the same as the return values of `Dimensions.get('window')` and `Dimensions.get('screen')`, respectively.


static **removeEventListener**(type, handler)

Remove an event handler.

