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
[Twitter](https://mobile.twitter.com),
[Major League Soccer](https://matchcenter.mlssoccer.com),
[Flipkart](https://twitter.com/naqvitalha/status/969577892991549440),
[Uber](https://www.youtube.com/watch?v=RV9rxrNIxnY),
[The Times](https://github.com/newsuk/times-components), [DataCamp](https://www.datacamp.com/community/tech/porting-practice-to-web-part1).

Browser support: Chrome, Firefox, Edge, Safari 7+, IE 10+.

## Quick start

The easiest way to get started is to edit this
[CodeSandbox](https://codesandbox.io/s/q4qymyp2l6) template (or
[Glitch](https://glitch.com/edit/#!/react-native)). You don’t need to install
anything to try it out.

For installation and configuration details please read the [getting
started](https://github.com/necolas/react-native-web/blob/master/docs/guides/getting-started.md)
guide.

## Documentation

Please refer to the [React Native documentation][react-native-url] for the
overall API, design details, and information about the [Gesture Responder
system](https://facebook.github.io/react-native/docs/gesture-responder-system.html)
and [animations](https://facebook.github.io/react-native/docs/animations.html).

Some components and APIs are extended with additional features for the web. And
in a few cases, features present for Android or iOS are missing on the web.
These differences are documented [on the website][website-url].

### Guides

These guides provide a detailed look at using React Native to create accessible
web experiences. Certain web-specific patterns are documented in the "web
recipes" guide.

* [Getting started](https://github.com/necolas/react-native-web/blob/master/docs/guides/getting-started.md)
* [Client-side rendering](https://github.com/necolas/react-native-web/blob/master/docs/guides/client-side-rendering.md)
* [Server-side rendering](https://github.com/necolas/react-native-web/blob/master/docs/guides/server-side-rendering.md)
* [Style](https://github.com/necolas/react-native-web/blob/master/docs/guides/style.md)
* [Accessibility](https://github.com/necolas/react-native-web/blob/master/docs/guides/accessibility.md)
* [Internationalization](https://github.com/necolas/react-native-web/blob/master/docs/guides/internationalization.md)
* [Direct manipulation](https://github.com/necolas/react-native-web/blob/master/docs/guides/direct-manipulation.md)
* [Web recipes](https://github.com/necolas/react-native-web/blob/master/docs/guides/web-recipes.md)
* [Multi-platform apps](https://github.com/necolas/react-native-web/blob/master/docs/guides/multi-platform-apps.md)
* [Experimental / unstable use](https://github.com/necolas/react-native-web/blob/master/docs/guides/advanced.md)

## Integrations

Examples of using React Native for Web with other web tools:

* [Docz](https://github.com/pedronauck/docz-plugin-react-native)
* [Gatsby](https://github.com/slorber/gatsby-plugin-react-native-web)
* [Next.js](https://github.com/zeit/next.js/tree/master/examples/with-react-native-web) (and [example recipes](https://gist.github.com/necolas/f9034091723f1b279be86c7429eb0c96))
* [Phenomic](https://github.com/phenomic/phenomic/tree/master/examples/react-native-web-app)
* [Razzle](https://github.com/jaredpalmer/razzle/tree/master/examples/with-react-native-web)
* [Rogue.js](https://github.com/alidcastano/rogue.js/tree/master/examples/with-react-native-web)
* [Storybook](https://github.com/necolas/react-native-web/tree/master/packages/website/storybook/.storybook)
* [Styleguidist](https://github.com/styleguidist/react-styleguidist/tree/master/examples/react-native)

## Examples

Check out all the [React Native examples][examples-url] ([source
code](https://github.com/necolas/react-native-web/blob/master/packages/examples)).
There are more examples [on the website][website-url] ([source
code](https://github.com/necolas/react-native-web/blob/master/packages/website)).
And here is a simple example to get you started:

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

## Compatibility with React Native

React Native v0.55

### Components

| Name                     | Status | Notes |
| :----------------------- | :----- | :---- |
| ActivityIndicator        | ✓      |  |
| ART                      | ✓      |  |
| Button                   | ✓      |  |
| CheckBox                 | ✓      |  |
| FlatList                 | ✓      |  |
| Image                    | ✓      | Missing multiple sources ([#515](https://github.com/necolas/react-native-web/issues/515)) and HTTP headers ([#1019](https://github.com/necolas/react-native-web/issues/1019)). |
| ImageBackground          | ✓      |  |
| KeyboardAvoidingView     | (✓)    | Mock. No equivalent web APIs. |
| ListView                 | ✓      |  |
| Modal                    | ✘      | Not started ([#1020](https://github.com/necolas/react-native-web/issues/1020)). |
| Picker                   | ✓      |  |
| RefreshControl           | ✘      | Not started ([#1027](https://github.com/necolas/react-native-web/issues/1027)). |
| SafeAreaView             | ✓      |  |
| ScrollView               | ✓      | Missing momentum scroll events ([#1021](https://github.com/necolas/react-native-web/issues/1021)) and `pagingEnabled` ([#1057](https://github.com/necolas/react-native-web/issues/1057)). |
| SectionList              | ✓      |  |
| Slider                   | ✘      | Not started ([#1022](https://github.com/necolas/react-native-web/issues/1022)). |
| StatusBar                | (✓)    | Mock. No equivalent web APIs. |
| SwipeableFlatList        | ✓      |  |
| SwipeableListView        | ✓      |  |
| Switch                   | ✓      |  |
| Text                     | ✓      | Missing `onLongPress` ([#1011](https://github.com/necolas/react-native-web/issues/1011)) and `numberOfLines` ([#13](https://github.com/necolas/react-native-web/issues/13)) support. |
| TextInput                | ✓      | Missing `onContentSizeChange` ([#793](https://github.com/necolas/react-native-web/issues/793)), rich text features ([#1023](https://github.com/necolas/react-native-web/issues/1023)), and auto-expanding behaviour ([#795](https://github.com/necolas/react-native-web/issues/795)). |
| Touchable                | ✓      | Includes additional support for mouse and keyboard interactions. |
| TouchableHighlight       | ✓      |  |
| TouchableNativeFeedback  | ✘      | Not started ([#1024](https://github.com/necolas/react-native-web/issues/1024)). |
| TouchableOpacity         | ✓      |  |
| TouchableWithoutFeedback | ✓      |  |
| View                     | ✓      |  |
| VirtualizedList          | ✓      |  |
| WebView                  | ✘      | Not started ([1025](https://github.com/necolas/react-native-web/issues/1025)). |
| YellowBox                | (✓)    | Mock. No YellowBox functionality. |

### Modules

| Name                     | Status | Notes |
| :----------------------- | :----- | :---- |
| AccessibilityInfo        | (✓)    | Mock. No equivalent web APIs. |
| Alert                    | ✘      | Not started ([#1026](https://github.com/necolas/react-native-web/issues/1026)). |
| Animated                 | ✓      | Missing `useNativeDriver` support. |
| AppRegistry              | ✓      | Includes additional support for server rendering with `getApplication`. |
| AppState                 | ✓      |  |
| AsyncStorage             | ✓      |  |
| BackHandler              | (✓)    | Mock. No equivalent web APIs. |
| CameraRoll               | ✘      | No equivalent web APIs. |
| Clipboard                | ✓      |  |
| ColorPropType            | ✓      |  |
| DeviceInfo               | (✓)    | Limited information. |
| Dimensions               | ✓      |  |
| Easing                   | ✓      |  |
| EdgeInsetsPropType       | ✓      |  |
| Geolocation              | ✓      |  |
| I18nManager              | ✓      | Includes additional support for runtime switch to RTL. |
| ImageEditor              | ✘      | No equivalent web APIs. |
| ImageStore               | ✘      | No equivalent web APIs. |
| InteractionManager       | (✓)    |  |
| Keyboard                 | (✓)    | Mock. |
| LayoutAnimation          | (✓)    | Missing translation to web animations. |
| Linking                  | ✓      |  |
| NativeEventEmitter       | ✓      |  |
| NativeMethodsMixin       | ✓      |  |
| NativeModules            | (✓)    | Mocked. Missing ability to load native modules. |
| NetInfo                  | ✓      | Missing functionality to detect expensive connections as there are no equivalent web APIs. |
| PanResponder             | ✓      |  |
| PixelRatio               | ✓      |  |
| Platform                 | ✓      |  |
| PointPropType            | ✓      |  |
| Settings                 | ✘      | No equivalent web APIs. |
| Share                    | ✓      | Only available over HTTPS. Read about the [Web Share API](https://wicg.github.io/web-share/). |
| StyleSheet               | ✓      |  |
| TextPropTypes            | ✓      |  |
| UIManager                | ✓      |  |
| Vibration                | ✓      |  |
| ViewPropTypes            | ✓      |  |

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
