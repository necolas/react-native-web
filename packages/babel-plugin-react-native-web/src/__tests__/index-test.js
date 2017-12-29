const plugin = require('..');
const pluginTester = require('babel-plugin-tester');

pluginTester({
  plugin,
  snapshot: true,
  tests: [
    // import react-native
    "import { View } from 'react-native';",
    "import { Switch, Text, View as MyView, ViewPropTypes } from 'react-native';",
    "import { createElement, Switch, StyleSheet } from 'react-native';",
    "import { InvalidThing, TouchableOpacity } from 'react-native';",
    "import * as RNW from 'react-native';",

    // import react-native-web
    // "import { View } from 'react-native-web';",
    // "import { Switch, Text, View as MyView } from 'react-native-web';",
    // "import { createElement, Switch, StyleSheet } from 'react-native-web';",
    // "import { InvalidThing, TouchableOpacity } from 'react-native-web';",
    // "import * as RNW from 'react-native-web';",

    // require react-native
    "const { View } = require('react-native');",
    "let { Switch, Text, View: MyView } = require('react-native');",
    "var { createElement, Switch, StyleSheet } = require('react-native');",
    "const { InvalidThing, TouchableOpacity } = require('react-native');",

    // require react-native-web
    // "const { View } = require('react-native-web');",
    // "let { Switch, Text, View: MyView } = require('react-native-web');",
    // "var { createElement, Switch, StyleSheet } = require('react-native-web');",
    // "const { InvalidThing, TouchableOpacity } = require('react-native-web');",

    // export react-native
    "export { View } from 'react-native';",
    "export { Switch, Text, View as MyView, ViewPropTypes } from 'react-native';",
    "export { createElement, Switch, StyleSheet } from 'react-native';",
    "export { InvalidThing, TouchableOpacity } from 'react-native';",
    "export { default as RNW } from 'react-native';",
    {
      code: "const RNW = require('react-native');",
      output: "const RNW = require('react-native');",
      snapshot: false
    }
  ]
});
