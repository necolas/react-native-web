# Advanced use

## Use with existing React DOM components

React Native for Web exports a web-specific module called `createElement`,
which can be used to wrap React DOM components. This allows you to use React
Native's accessibility and style optimizations.

In the example below, `Video` will now accept common React Native props such as
`accessibilityLabel`, `accessible`, `style`, and even the Responder event
props.

```js
import { createElement } from 'react-native-web';
const Video = (props) => createElement('video', props);
```

This also works with composite components defined in your existing component
gallery or dependencies ([live example](https://www.webpackbin.com/bins/-KiTSGFw3fB9Szg7quLI)).

```js
import RaisedButton from 'material-ui/RaisedButton';
import { createElement } from 'react-native-web';
import { StyleSheet } from 'react-native';

const CustomButton = (props) => createElement(RaisedButton, {
  ...props,
  style: [ styles.button, props.style ]
});

const styles = StyleSheet.create({
  button: {
    padding: 20
  }
});
```

And `createElement` can be used as drop-in replacement for `React.createElement`:

```js
/* @jsx createElement */
import { createElement } from 'react-native-web';
const Video = (props) => <video {...props} style={[ { marginVertical: 10 }, props.style ]} />
```

Remember that React Native styles are not the same as React DOM styles, and
care needs to be taken not to pass React DOM styles into your React Native
wrapped components.

## Use as a library framework

The React Native (for Web) building blocks can be used to create higher-level
components and abstractions. In the example below, a `styled` function provides
an API inspired by styled-components ([live
example](https://www.webpackbin.com/bins/-KjT9ziwv4O7FDZdvsnX)).

```js
import { createElement } from 'react-native-web';
import { StyleSheet } from 'react-native';

/**
 * styled API
 */
const styled = (Component, styler) => {
  const isDOMComponent = typeof Component === 'string';

  class Styled extends React.Component {
    static contextTypes = {
      getTheme: React.PropTypes.func
    };

    render() {
      const theme = this.context.getTheme && this.context.getTheme();
      const localProps = { ...this.props, theme };
      const nextProps = { ...this.props }
      const style = typeof styler === 'function' ? styler(localProps) : styler;
      nextProps.style = [ style, this.props.style ];

      return (
        isDOMComponent
          ? createElement(Component, nextProps)
          : <Component {...nextProps} />
      );
    }
  }
  return Styled;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    flex: 1,
    justifyContent: 'center'
  }
});

const StyledView = styled(View, styles.container);
```

## Use with react-sketchapp

Use with [react-sketchapp](http://airbnb.io/react-sketchapp/) requires that you
alias `react-native` to `react-sketchapp`. This will allow you to render your
existing React Native components in Sketch. Sketch-specific components like
`Artboard` should be imported from `react-sketchapp`.

If you're using `skpm`, you can rely on an [undocumented
feature](https://github.com/sketch-pm/skpm/blob/master/lib/utils/webpackConfig.js)
which will merge your `webpack.config.js`, `.babelrc`, or `package.json` Babel
config into its internal webpack config. The simplest option may be to use the
[babel-plugin-module-alias](https://www.npmjs.com/package/babel-plugin-module-alias)
and configure it in your `package.json`.
