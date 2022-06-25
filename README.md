# React Native for Web

[![npm version][package-badge]][package-url] [![Build Status][ci-badge]][ci-url] [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

"React Native for Web" makes it possible to run [React Native][react-native-url] components and APIs on the web using React DOM.

## Documentation

The [documentation site](https://necolas.github.io/react-native-web/) covers installation, guides, and APIs.

## Example

And here is a [simple example](https://necolas.github.io/react-native-web/examples/) to get you started. The example app includes [interactive examples](https://necolas.github.io/react-native-web/examples/) and the [source code](https://github.com/necolas/react-native-web/blob/master/packages/examples) is also available.

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

You'll notice that there is no reference to `react-dom`; the `App` component is defined using the platform-agnostic APIs and Components introduced by React Native. This allows the app to be rendered to web and native platforms.

## Contributing

The main purpose of this repository is to help evolve React web and native development towards the platform-agnostic design of React Native, and in the process make it faster and easier to build high-quality experiences for the web with React. Development happens in the open on GitHub, and we are grateful for contributing bugfixes and improvements. Read below to learn how you can take part in improving React Native for Web.

### Code of conduct

Meta has adopted a [Code of Conduct][code-of-conduct] that this project expects all participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing guide

Read the [contributing guide][contributing-url] to learn about the development process, how to propose bugfixes and improvements, and how to build and test your changes to React Native for Web.

### Good first issues

To help you get you familiar with the contribution process, there is a list of [good first issues][good-first-issue-url] that contain bugs which have a relatively limited scope. This is a great place to get started.

## License

React Native for Web is [MIT licensed](./LICENSE). By contributing to React Native for Web, you agree that your contributions will be licensed under its MIT license.

[package-badge]: https://img.shields.io/npm/v/react-native-web.svg?style=flat
[package-url]: https://www.npmjs.com/package/react-native-web
[ci-badge]: https://github.com/necolas/react-native-web/workflows/tests/badge.svg
[ci-url]: https://github.com/necolas/react-native-web/actions
[react-native-url]: https://reactnative.dev/
[contributing-url]: https://github.com/necolas/react-native-web/blob/master/.github/CONTRIBUTING.md
[good-first-issue-url]: https://github.com/necolas/react-native-web/labels/good%20first%20issue
[code-of-conduct]: https://opensource.fb.com/code-of-conduct/
