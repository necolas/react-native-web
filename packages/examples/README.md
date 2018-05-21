# examples

These examples are a clone of React Native's
[RNTester](https://github.com/facebook/react-native/tree/v0.55.4/RNTester).
RNTester showcases React Native views and modules. It's used to manually verify
the appearance and behavior of React Native for Web.

Try the [examples app](https://necolas.github.io/react-native-web/examples) online.

To run the examples locally:

```
yarn examples
open ./packages/examples/dist/index.html
```

Develop against these examples:

```
yarn compile --watch
NODE_ENV=development yarn examples --watch
```

## Notes

The RNTester examples rely on features specific to [React Native's
packager](https://github.com/facebook/metro) such as loading resolution
variants of images, Babel transforms, compiling ES module dependencies, and
Haste – Facebook's module system. These features are *emulated* in this
package's `webpack.config.js`.

The commonjs export in `react-native-web` is also used to ensure that webpack
can load the aliased modules correctly (as compiled ES modules are only
available from the `.default` property of a module.)
