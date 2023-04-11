const plugin = require('..');
const pluginTester = require('babel-plugin-tester').default;

function createTests(pluginOptions) {
  return [
    // import react-native
    {
      title: 'import from "react-native"',
      code: `import ReactNative from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Invalid, View as MyView } from 'react-native';
import { useLocaleContext } from 'react-native';
import * as ReactNativeModules from 'react-native';`,
      snapshot: true,
      pluginOptions
    },
    {
      title: 'import from "react-native-web"',
      code: `import { unstable_createElement } from 'react-native-web';
import { StyleSheet, View, Pressable, processColor } from 'react-native-web';
import * as ReactNativeModules from 'react-native-web';`,
      snapshot: true,
      pluginOptions
    },
    {
      title: 'export from "react-native"',
      code: `export { View } from 'react-native';
export { StyleSheet, Text, unstable_createElement } from 'react-native';`,
      snapshot: true,
      pluginOptions
    },
    {
      title: 'export from "react-native-web"',
      code: `export { View } from 'react-native-web';
export { StyleSheet, Text, unstable_createElement } from 'react-native-web';`,
      snapshot: true,
      pluginOptions
    },
    // require react-native
    {
      title: 'require "react-native"',
      code: `const ReactNative = require('react-native');
const { View } = require('react-native');
const { StyleSheet, Pressable } = require('react-native');`,
      snapshot: true,
      pluginOptions
    },
    {
      title: 'require "react-native-web"',
      code: `const ReactNative = require('react-native-web');
const { unstable_createElement } = require('react-native-web');
const { StyleSheet, View, Pressable, processColor } = require('react-native-web');`,
      snapshot: true,
      pluginOptions
    }
  ];
}

pluginTester({
  babelOptions: {
    generatorOpts: {
      jsescOption: {
        quotes: 'single'
      }
    }
  },
  plugin,
  pluginName: '[legacy] Rewrite react-native to react-native-web',
  tests: createTests({})
});

pluginTester({
  babelOptions: {
    generatorOpts: {
      jsescOption: {
        quotes: 'single'
      }
    }
  },
  plugin,
  pluginName: '[commonjs] Rewrite react-native to react-native-web',
  tests: createTests({ commonjs: true })
});

pluginTester({
  babelOptions: {
    generatorOpts: {
      jsescOption: {
        quotes: 'single'
      }
    }
  },
  plugin,
  pluginName: 'Rewrite react-native to react-native-web',
  tests: createTests({ legacy: false })
});
