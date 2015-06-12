# `Component`

This component is part of the implementation for managing styles across the
`className` and `style` properties. It is the building block upon which all
other components in `react-web-sdk` are built.

## PropTypes

All other props are transferred directly to the `element`.

+ `element`: `func` or `string`
+ `style`: `object`

#### Examples

```js
import {Component, pickProps} from 'react-web-sdk';
import React, {PropTypes} from 'react';

const ExampleStylePropTypes = { opacity: PropTypes.number };
const ExampleStyleDefaultProps = { opacity: 1 };

class Example extends React.Component {
  static propTypes = {
    style: PropTypes.shape(ExampleStylePropTypes)
  }

  render() {
    const { style, ...other } = this.props;
    // only apply supported styles
    const supportedStyle = pickProps(style, ExampleStylePropTypes);
    // merge with default styles
    const mergedStyle = { ...ExampleStyleDefaultProps, ...supportedStyle }

    return (
      <Component
        ...other
        element="main"
        style={mergedStyle}
      />
    );
  }
}
```
