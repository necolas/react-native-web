const plugin = require('../rewrite-paths');
const pluginTester = require('babel-plugin-tester');

pluginTester({
  plugin,
  snapshot: true,
  tests: [
    "import { View } from 'react-native';",
    "import { Switch, Text, View as MyView } from 'react-native';",
    "import { createElement, Switch, StyleSheet } from 'react-native';",
    "import { InvalidThing, TouchableOpacity } from 'react-native';",
    "import * as RNW from 'react-native';",
    "const { View } = require('react-native');",
    "let { Switch, Text, View: MyView } = require('react-native');",
    "var { createElement, Switch, StyleSheet } = require('react-native');",
    "const { InvalidThing, TouchableOpacity } = require('react-native');",
    {
      code: "const RNW = require('react-native');",
      output: "const RNW = require('react-native');",
      snapshot: false
    }
  ]
});
