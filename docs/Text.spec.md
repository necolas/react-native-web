# Text spec

Text layout and styles.

#### PropTypes

All other props are transferred directly to the `element`.

+ `element`: `func` or `string` (default `"div"`)
+ `style`: `TextStylePropTypes`

#### TextStylePropTypes

+ ViewStylePropTypes
+ TypographicPropTypes

## Examples

```js
import {Text} from 'react-web-sdk';
import React, {PropTypes} from 'react';

class PrettyText extends React.Component {
  static propTypes = {
    color: PropTypes.oneOf(['white', 'gray', 'red']),
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    weight: PropTypes.oneOf(['light', 'normal', 'bold'])
  }

  static defaultProps = {
    color: 'gray',
    size: 'normal',
    weight: 'normal'
  }

  render() {
    const { color, size, style, weight, ...other } = this.props;

    return (
      <Text
        ...other
        style={{
          ...style,
          ...localStyle.color[color],
          ...localStyle.size[size],
          ...localStyle.weight[weight]
        }}
      />
    );
  }
}

const localStyle = {
  color: {
    white: { color: 'white' },
    gray: { color: 'gray' },
    red: { color: 'red' }
  },
  size: {
    small: { fontSize: '0.85rem', padding: '0.5rem' },
    normal: { fontSize: '1rem', padding: '0.75rem' },
    large: { fontSize: '1.5rem', padding: '1rem' }
  },
  weight: {
    light: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    bold: { fontWeight: '700' }
  }
}
```
