# View spec

`View` is a flexbox container and the fundamental building block for UI. It is
designed to be nested inside other `View`'s and to have 0-to-many children of
any type.

## PropTypes

All other props are transferred directly to the `element`.

+ `component`: `func` or `string` (default `'div'`)
+ `pointerEvents`: `oneOf('all', 'box-only', 'box-none', 'none')`
+ `style`: `ViewStylePropTypes`

## ViewStylePropTypes

+ BackgroundPropTypes
+ BorderThemePropTypes
+ LayoutPropTypes
+ `boxShadow`: `string`
+ `color`: `string`
+ `opacity`: `number`

## ViewDefaultStyle

Implements the default styles from
[facebook/css-layout](https://github.com/facebook/css-layout).

1. All the flex elements are oriented from top-to-bottom, left-to-right and do
   not shrink. This is how things are laid out using the default CSS settings
   and what you'd expect.

2. The most convenient way to express the relation between width and other
   box-model properties.

3. Everything is `display:flex` by default. All the behaviors of `block` and
   `inline-block` can be expressed in term of flex but not the opposite.

4. Everything is `position:relative`. This makes `position:absolute` target the
   direct parent and not some parent which is either relative or absolute. If
   you want to position an element relative to something else, you should move
   it in the DOM instead of relying of CSS. It also makes `top`, `left`,
   `right`, `bottom` do something when not specifying `position:absolute`.

```js
const ViewDefaultStyle = {
  alignItems: 'stretch', // 1
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box', // 2
  display: 'flex', // 3
  flexBasis: 'auto', // 1
  flexDirection: 'column', // 1
  flexShrink: 0, // 1
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative' // 4
};
```

## Examples

```js
// TODO
```
