const plugin = require('..');
const pluginTester = require('babel-plugin-tester');

const tests = [
  // import react-native
  {
    title: 'import from "native-native"',
    code: `import ReactNative from 'react-native';
import { View } from 'react-native';
import { Invalid, View as MyView, ViewPropTypes } from 'react-native';
import * as ReactNativeModules from 'react-native';`,
    snapshot: true
  },
  {
    title: 'import from "native-native"',
    code: `import ReactNative from 'react-native';
import { View } from 'react-native';
import { Invalid, View as MyView, ViewPropTypes } from 'react-native';
import * as ReactNativeModules from 'react-native';`,
    snapshot: true,
    pluginOptions: { commonjs: true }
  },
  {
    title: 'import from "react-native-web"',
    code: `import { createElement } from 'react-native-web';
import { ColorPropType, StyleSheet, View, TouchableOpacity, processColor } from 'react-native-web';
import * as ReactNativeModules from 'react-native-web';`,
    snapshot: true
  },
  {
    title: 'export from "react-native"',
    code: `export { View } from 'react-native';
export { ColorPropType, StyleSheet, Text, createElement } from 'react-native';`,
    snapshot: true
  },
  {
    title: 'export from "react-native-web"',
    code: `export { View } from 'react-native-web';
export { ColorPropType, StyleSheet, Text, createElement } from 'react-native-web';`,
    snapshot: true
  },
  {
    title: 'require "react-native"',
    code: `const ReactNative = require('react-native');
const { View } = require('react-native');
const { StyleSheet, TouchableOpacity } = require('react-native');`,
    snapshot: true
  },
  {
    title: 'require "react-native"',
    code: `const ReactNative = require('react-native');
const { View } = require('react-native');
const { StyleSheet, TouchableOpacity } = require('react-native');`,
    snapshot: true,
    pluginOptions: { commonjs: true }
  },
  {
    title: 'require "react-native-web"',
    code: `const ReactNative = require('react-native-web');
const { createElement } = require('react-native-web');
const { ColorPropType, StyleSheet, View, TouchableOpacity, processColor } = require('react-native-web');`,
    snapshot: true
  }
];

pluginTester({
  plugin,
  tests
});
