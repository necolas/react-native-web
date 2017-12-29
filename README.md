# React Native for Web

[![npm version][package-badge]][package-url] [![Build Status][ci-badge]][ci-url] [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

"React Native for Web" brings the platform-agnostic Components and APIs of
[React Native][react-native-url] to the Web.

* **High-quality user interfaces**: React Native for Web makes it easy to
create [fast](packages/benchmarks/README.md), adaptive web UIs in
JavaScript. It provides native-like interactions, optimized vendor-prefixed
styles, support for all interaction types (touch, mouse, keyboard), accessible
experiences, built-in support for RTL layout, and integrates with React Dev
Tools.

* **Write once, render anywhere**: React Native for Web interoperates with
existing React DOM components and is compatible with the majority of the
React Native API. You can develop new components for native and web without
rewriting existing code. React Native for Web can also render to HTML and
critical CSS on the server using Node.js.

React Native for Web is used extensively in production by [Twitter
Lite](https://mobile.twitter.com). The library's performance was experimentally
validated at scale including in emerging markets, and an independent audit
found Twitter Lite to be Twitter's most accessible app.

Browser support: Chrome, Firefox, Safari >= 7, IE 10, Edge.

## Quick start

The easiest way to get started with React Native for Web is to use this
[ready-to-go project on Glitch](https://glitch.com/edit/#!/react-native-web-playground).
You don’t need to install anything to try it out.

If you are unfamiliar with setting up a React web project, please follow the
recommendations in the the official [React documentation](https://reactjs.org/).

## Documentation

You can find the React Native for Web API documentation [on the
website][website-url].

Please refer to the [React Native documentation][react-native-url] for details
about its design, the [Gesture Responder system](https://facebook.github.io/react-native/docs/gesture-responder-system.html),
and [animations](https://facebook.github.io/react-native/docs/animations.html).

### Installation

Install using `yarn` or `npm`:

```
yarn add react react-dom react-native-web
yarn add --dev babel-plugin-react-native-web
```

### Guides

* [Getting started](website/guides/getting-started.md)
* [Style](website/guides/style.md)
* [Accessibility](website/guides/accessibility.md)
* [Internationalization](website/guides/internationalization.md)
* [Direct manipulation](website/guides/direct-manipulation.md)
* [Advanced use](website/guides/advanced.md)

## Examples

There are several examples [on the website][website-url] and in the [website's
source code](./website). Here is an example to get you started:

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

React Native for Web is [BSD licensed](./LICENSE).

[package-badge]: https://img.shields.io/npm/v/react-native-web.svg?style=flat
[package-url]: https://yarnpkg.com/en/package/react-native-web
[ci-badge]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[ci-url]: https://travis-ci.org/necolas/react-native-web
[website-url]: https://necolas.github.io/react-native-web/storybook/
[react-native-url]: https://facebook.github.io/react-native/
[contributing-url]: ./.github/CONTRIBUTING.md
[good-first-issue-url]: https://github.com/necolas/react-native-web/labels/good%20first%20issue
[code-of-conduct]: https://code.facebook.com/codeofconduct
