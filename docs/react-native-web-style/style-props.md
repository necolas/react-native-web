## StyleProp spec

### Background

+ `backgroundColor`: `string`
+ `backgroundImage`: `string`
+ `backgroundPosition`: `string`
+ `backgroundRepeat`: `string`
+ `backgroundSize`: `string`

### BorderTheme

+ `borderColor`: `string`
+ `borderTopColor`: `string`
+ `borderRightColor`: `string`
+ `borderBottomColor`: `string`
+ `borderLeftColor`: `string`
+ `borderStyle`: `string`
+ `borderRadius`: `number` or `string`
+ `borderTopLeftRadius`: `number` or `string`
+ `borderTopRightRadius`: `number` or `string`
+ `borderBottomLeftRadius`: `number` or `string`
+ `borderBottomRightRadius`: `number` or `string`

### BoxModel

+ `borderWidth`: `number` or `string`
+ `borderTopWidth`: `number` or `string`
+ `borderRightWidth`: `number` or `string`
+ `borderBottomWidth`: `number` or `string`
+ `borderLeftWidth`: `number` or `string`
+ `boxSizing`: `oneOf('border-box', 'content-box')`
+ `display`: `oneOf('block', 'flex', 'inline', 'inline-block', 'inline-flex')`
+ `height`: `number` or `string`
+ `margin`: `number` or `string`
+ `marginTop`: `number` or `string`
+ `marginRight`: `number` or `string`
+ `marginBottom`: `number` or `string`
+ `marginLeft`: `number` or `string`
+ `padding`: `number` or `string`
+ `paddingTop`: `number` or `string`
+ `paddingRight`: `number` or `string`
+ `paddingBottom`: `number` or `string`
+ `paddingLeft`: `number` or `string`
+ `width`: `number` or `string`

### Flexbox

* `alignContent`: `oneOf('center', 'flex-end', 'flex-start', 'stretch', 'space-around', 'space-between')`
* `alignItems`: `oneOf('baseline', 'center', 'flex-end', 'flex-start', 'stretch')`
* `alignSelf`: `oneOf('auto', 'baseline', 'center', 'flex-end', 'flex-start', 'stretch')`
* `flex`: `string`
* `flexBasis`: `string`
* `flexDirection`: `oneOf('column', 'column-reverse', 'row', 'row-reverse')`
* `flexGrow`: `number`
* `flexShrink`: `number`
* `flexWrap`: `oneOf('nowrap', 'wrap', 'wrap-reverse')`
* `justifyContent`: `oneOf('center', 'flex-end', 'flex-start', 'space-around', 'space-between')`
* `order`: `number`

### Layout

* BoxModel
* Flexbox
* Position

### Position

* `position`: `oneOf('absolute', 'fixed', 'relative')`
* `bottom`: `number` or `string`
* `left`: `number` or `string`
* `right`: `number` or `string`
* `top`: `number` or `string`
* `zIndex`: `number`

### Typographic

* `direction`: `oneOf('auto', 'ltr', 'rtl')`
* `fontFamily`: `string`
* `fontSize`: `string`
* `fontWeight`: `oneOf('100', '200', '300', '400', '500', '600', '700', '800', '900', 'bold', 'normal')`
* `fontStyle`: `oneOf('normal', 'italic')`
* `letterSpacing`: `string`
* `lineHeight`: `number` or `string`
* `textAlign`: `oneOf('auto', 'left', 'right', 'center')`
* `textDecoration`: `oneOf('none', 'underline')`
* `textTransform`: `oneOf('capitalize', 'lowercase', 'none', 'uppercase')`
* `wordWrap`: `oneOf('break-word', 'normal')`

