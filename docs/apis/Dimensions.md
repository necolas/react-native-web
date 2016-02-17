# Dimensions

Note: dimensions may change (e.g due to device rotation) so any rendering logic
or styles that depend on these constants should try to call this function on
every render, rather than caching the value.

## Methods

static **get**(dimension: string)

Get a dimension (e.g., `"window"` or `"screen"`).

Example: `const { height, width } = Dimensions.get('window')`
