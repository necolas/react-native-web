---
title: Unstable APIs
date: Last Modified
permalink: /docs/unstable-apis/index.html
description:
eleventyNavigation:
  key: Unstable APIs
  parent: Appendix
  order: 1
---

:::lead
The following APIs are unstable and subject to breaking changes. Use at your own risk.
:::

## Use with existing React DOM components

React Native for Web exports a web-specific module called `unstable_createElement`, which can be used to wrap React DOM components. This allows you to use React Native's accessibility and style optimizations. Since this is a web-specific export it should always be imported from the `react-native-web` package.

In the example below, `Video` will now accept common React Native props such as `aria-label`, `accessible`, `style`, and even the Responder event props.

```js
import { unstable_createElement } from 'react-native-web';
const Video = (props) => unstable_createElement('video', props);
```

This also works with composite components defined in your existing component gallery or dependencies.

```js
import RaisedButton from 'material-ui/RaisedButton';
import { unstable_createElement, useLocaleContext } from 'react-native-web';
import { StyleSheet } from 'react-native';

const CustomButton = (props) => {
  const { direction } = useLocaleContext();

  return unstable_createElement(
    RaisedButton,
    { ...props, style: [styles.button, props.style] },
    { writingDirection: direction }
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20
  }
});
```

Remember that React Native styles are not the same as React DOM styles, and care needs to be taken not to pass React DOM styles into your React Native wrapped components.

## Use as a library framework

The React Native (for Web) building blocks can be used to create higher-level components and abstractions. In the example below, a `styled` function provides an API inspired by styled-components. It accepts a tag name or a component, and a style or a function that returns a style from the props and the theme.

```jsx
import { createContext, use } from 'react';
import { unstable_createElement } from 'react-native-web';
import { StyleSheet, View } from 'react-native';

const ThemeContext = createContext(null);

const styled = (Component, styler) => {
  const isDOMComponent = typeof Component === 'string';

  const Styled = (props) => {
    const nextProps = {
      ...props,
      style: [
        typeof styler === 'function'
          ? styler({ ...props, theme: use(ThemeContext) })
          : styler,
        props.style
      ]
    };

    return isDOMComponent ? (
      unstable_createElement(Component, nextProps)
    ) : (
      <Component {...nextProps} />
    );
  };

  return Styled;
};

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
