# React Native for Web

[![npm version][package-badge]][package-url] [![Build Status][ci-badge]][ci-url] [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

**Compatibility: React Native 0.55**.

"React Native for Web" makes it possible to run [React
Native][react-native-url] components and APIs on the web using React DOM. Check
out the live demo of the [React Native examples][examples-url] running on the
web.

* **High-quality web interfaces**: makes it easy to
create [fast](https://github.com/necolas/react-native-web/blob/master/packages/benchmarks/README.md),
adaptive web UIs in JavaScript. It provides native-quality interactions, support
for multiple input modes (touch, mouse, keyboard), optimized vendor-prefixed
styles, built-in support for RTL layout, built-in accessibility, and integrates
with React Dev Tools.

* **Write once, render anywhere**: interoperates with existing React DOM
components and is compatible with the majority of the React Native API. You can
develop new components for native and web without rewriting existing code.
React Native for Web can also render to HTML and critical CSS on the server
using Node.js.

Who is using React Native in production web apps?
[Twitter](https://mobile.twitter.com), [Major League
Soccer](https://matchcenter.mlssoccer.com),
[Flipkart](https://www.flipkart.com/), Playstation, Uber, [The
Times](https://github.com/newsuk/times-components).

Browser support: Chrome, Firefox, Edge, Safari 7+, IE 10+.

## Quick start

The easiest way to get started is to edit this
[CodeSandbox](https://codesandbox.io/s/q4qymyp2l6) template (or
[Glitch](https://glitch.com/edit/#!/react-native)). You don’t need to install
anything to try it out.

For installation and configuration details please read the [getting
started](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/getting-started.md)
guide.

## Documentation

You can find the API documentation [on the website][website-url].

Please refer to the [React Native documentation][react-native-url] for more
design details, and for information about the [Gesture Responder
system](https://facebook.github.io/react-native/docs/gesture-responder-system.html)
and [animations](https://facebook.github.io/react-native/docs/animations.html).

### Guides

* [Getting started](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/getting-started.md)
* [Style](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/style.md)
* [Accessibility](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/accessibility.md)
* [Internationalization](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/internationalization.md)
* [Direct manipulation](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/direct-manipulation.md)
* [Experimental / unstable use](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/advanced.md)

## Examples

There are examples [on the website][website-url] ([source
code](https://github.com/necolas/react-native-web/blob/master/packages/website).
And all the [React Native examples][examples-url] ([source
code](https://github.com/necolas/react-native-web/blob/master/packages/examples))
are also available. Here is an example to get you started:

```js
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>Hello, world!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' }
});

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('react-root') });
```

This example will render the `App` into a container on the page.

You'll notice that there is no reference to `react-dom`; the `App` component is
defined using the platform-agnostic APIs and Components introduced by React
Native. This allows the app to be rendered to web and native platforms.

## Integrations

Examples of using React Native for Web with other web tools:

* [Gatsby](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-react-native-web)
* [Next.js](https://github.com/zeit/next.js/tree/master/examples/with-react-native-web)
* [Phenomic](https://github.com/phenomic/phenomic/tree/master/examples/react-native-web-app)
* [Razzle](https://github.com/jaredpalmer/razzle/tree/master/examples/with-react-native-web)
* [Storybook](https://github.com/necolas/react-native-web/tree/master/packages/website/storybook/.storybook)
* [Styleguidist](https://github.com/styleguidist/react-styleguidist/tree/master/examples/react-native)

Example recipes for web-specific UI patterns:

* [Links](https://codesandbox.io/s/53r88k5opx)
* [Hover styles](https://codesandbox.io/s/o9q8vy70l5)
* [Root element styles](https://codesandbox.io/s/52x1871vjl)

## Compatibility with React Native

React Native v0.55

### Components

| Name                     | Status              | Notes |
| :----------------------- | :------------------ | :---- |
| ActivityIndicator        | Available           |  |
| ART                      | Available           |  |
| Button                   | Available           |  |
| CheckBox                 | Available           |  |
| FlatList                 | Available           |  |
| Image                    | Available (partial) | Missing multiple sources and HTTP headers. |
| ImageBackground          | Available           |  |
| KeyboardAvoidingView     | Available (mock)    |  |
| ListView                 | Available           |  |
| Modal                    | Not started         |  |
| Picker                   | Available           |  |
| RefreshControl           | Not started         |  |
| SafeAreaView             | Available           |  |
| ScrollView               | Available (partial) | Missing momentum scroll events. |
| SectionList              | Available           |  |
| Slider                   | Not started         |  |
| StatusBar                | Mock                |  |
| SwipeableFlatList        | Available           |  |
| SwipeableListView        | Available           |  |
| Switch                   | Available           |  |
| Text                     | Available (partial) | Missing `onLongPress` support. |
| TextInput                | Available (partial) | Missing rich text features and auto-expanding behaviour. |
| Touchable                | Available           | Includes additional support for mouse and keyboard interactions. |
| TouchableHighlight       | Available           |  |
| TouchableNativeFeedback  | Not started         |  |
| TouchableOpacity         | Available           |  |
| TouchableWithoutFeedback | Available           |  |
| View                     | Available           |  |
| VirtualizedList          | Available           |  |
| WebView                  | Not started         |  |
| YellowBox                | Mock                |  |

### Modules

| Name                     | Status              | Notes |
| :----------------------- | :------------------ | :---- |
| AccessibilityInfo        | Mock                | No equivalent web APIs. |
| Alert                    | Not started         | |
| Animated                 | Available           | Missing `useNativeDriver` support. |
| AppRegistry              | Available           | Includes additional support for SSR with `getApplication`. |
| AppState                 | Available           |  |
| AsyncStorage             | Available           |  |
| BackHandler              | Mock                | No equivalent web APIs. |
| CameraRoll               | Not started         | No equivalent web APIs. |
| Clipboard                | Available           |  |
| ColorPropType            | Available           |  |
| DeviceInfo               | Available (partial) |  |
| Dimensions               | Available           |  |
| Easing                   | Available           |  |
| EdgeInsetsPropType       | Available           |  |
| Geolocation              | Available           |  |
| I18nManager              | Available           | Includes additional support for runtime switch to RTL. |
| ImageEditor              | Not started         | No equivalent web APIs. |
| ImageStore               | Not started         | No equivalent web APIs. |
| InteractionManager       | Available (partial) |  |
| Keyboard                 | Mock                |  |
| LayoutAnimation          | Available (partial) | Missing transform to web animation. |
| Linking                  | Available           |  |
| NativeEventEmitter       | Available           |  |
| NativeMethodsMixin       | Available           |  |
| NativeModules            | Available (partial) | Mocked. Missing ability to load native modules. |
| NetInfo                  | Available (partial) | Missing functionality to detect extensive connections. |
| PanResponder             | Available           |  |
| PixelRatio               | Available           |  |
| Platform                 | Available           |  |
| PointPropType            | Available           |  |
| Settings                 | Not started         |  |
| Share                    | Available           | Only available over HTTPS. Read about the [Web Share API](https://wicg.github.io/web-share/). |
| StyleSheet               | Available           |  |
| TextPropTypes            | Available           |  |
| UIManager                | Available           |  |
| Vibration                | Available           |  |
| ViewPropTypes            | Available           |  |

## Contributing

The main purpose of this repository is to help evolve React web and native
development towards the platform-agnostic design of React Native, and in the
process make it faster and easier to build high-quality experiences for the web
with React. Development happens in the open on GitHub, and we are grateful for
contributing bugfixes and improvements. Read below to learn how you can take
part in improving React Native for Web.

### Code of conduct

Facebook has adopted a [Code of Conduct][code-of-conduct] that this project
expects all participants to adhere to. Please read the full text so that you
can understand what actions will and will not be tolerated.

### Contributing guide

Read the [contributing guide][contributing-url] to learn about the
development process, how to propose bugfixes and improvements, and how to build
and test your changes to React Native for Web.

### Good first issues

To help you get you familiar with the contribution process, there is a list of
[good first issues][good-first-issue-url] that contain bugs which have a
relatively limited scope. This is a great place to get started.

## License

React Native for Web is [MIT licensed](./LICENSE). By contributing to React
Native for Web, you agree that your contributions will be licensed under its
MIT license.

[package-badge]: https://img.shields.io/npm/v/react-native-web.svg?style=flat
[package-url]: https://yarnpkg.com/en/package/react-native-web
[ci-badge]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[ci-url]: https://travis-ci.org/necolas/react-native-web
[examples-url]: https://necolas.github.io/react-native-web/examples/
[website-url]: https://necolas.github.io/react-native-web/storybook/
[react-native-url]: https://facebook.github.io/react-native/
[contributing-url]: https://github.com/necolas/react-native-web/blob/master/.github/CONTRIBUTING.md
[good-first-issue-url]: https://github.com/necolas/react-native-web/labels/good%20first%20issue
[code-of-conduct]: https://code.facebook.com/codeofconduct
