---
title: React Native compatibility
date: Last Modified
permalink: /docs/react-native-compatibility/index.html
eleventyNavigation:
  key: React Native compatibility
  parent: Start
  order: 5
---

:::lead
React Native for Web provides compatibility with the vast majority of React Native's JavaScript API. Features deprecated in React Native should be considered *unsupported* in React Native for Web.
:::

**Best used with React Native >= 0.63**.

Visit the [React Native Directory](https://reactnative.directory/?web=true) to find React Native packages with known web support.

## Components

| Name                     | Status | Notes |
| :----------------------- | :----- | :---- |
| ActivityIndicator        | ✓      |  |
| Button                   | ✓      |  |
| CheckBox                 | ✓      |  |
| FlatList                 | ✓      |  |
| Image                    | ✓      | Missing multiple sources ([#515](https://github.com/necolas/react-native-web/issues/515)) and HTTP headers ([#1019](https://github.com/necolas/react-native-web/issues/1019)). |
| ImageBackground          | ✓      |  |
| KeyboardAvoidingView     | (✓)    | Mock. No equivalent web APIs. |
| Modal                    | ✓      |  |
| Picker                   | ✓      |  |
| Pressable                | ✓      |  |
| RefreshControl           | ✘      | Not started ([#1027](https://github.com/necolas/react-native-web/issues/1027)). |
| SafeAreaView             | ✓      |  |
| ScrollView               | ✓      | Missing momentum scroll events ([#1021](https://github.com/necolas/react-native-web/issues/1021)). |
| SectionList              | ✓      |  |
| StatusBar                | (✓)    | Mock. No equivalent web APIs. |
| Switch                   | ✓      |  |
| Text                     | ✓      | No `onLongPress` ([#1011](https://github.com/necolas/react-native-web/issues/1011)). |
| TextInput                | ✓      | Missing rich text features ([#1023](https://github.com/necolas/react-native-web/issues/1023)), and auto-expanding behaviour ([#795](https://github.com/necolas/react-native-web/issues/795)). |
| Touchable                | ✓      | Includes additional support for mouse and keyboard interactions. |
| TouchableHighlight       | ✓      |  |
| TouchableNativeFeedback  | ✘      | Not started ([#1024](https://github.com/necolas/react-native-web/issues/1024)). |
| TouchableOpacity         | ✓      |  |
| TouchableWithoutFeedback | ✓      |  |
| View                     | ✓      |  |
| VirtualizedList          | ✓      |  |
| YellowBox                | (✓)    | Mock. No YellowBox functionality. |

## APIs

| Name                     | Status | Notes |
| :----------------------- | :----- | :---- |
| AccessibilityInfo        | (✓)    | Mock. No equivalent web APIs. |
| Alert                    | ✘      | Not started ([#1026](https://github.com/necolas/react-native-web/issues/1026)). |
| Animated                 | ✓      | Missing `useNativeDriver` support. |
| Appearance               | ✓      |  |
| AppRegistry              | ✓      | Includes additional support for server rendering with `getApplication`. |
| AppState                 | ✓      |  |
| BackHandler              | (✓)    | Mock. No equivalent web APIs. |
| Clipboard                | ✓      |  |
| DeviceInfo               | (✓)    | Limited information. |
| Dimensions               | ✓      |  |
| Easing                   | ✓      |  |
| Geolocation              | ✓      |  |
| I18nManager              | (✓)    | Mock. See [localization](https://necolas.github.io/react-native-web/docs/localization/) for preferred approach. |
| InteractionManager       | (✓)    |  |
| Keyboard                 | (✓)    | Mock. |
| LayoutAnimation          | (✓)    | Missing translation to web animations. |
| Linking                  | ✓      |  |
| NativeEventEmitter       | ✓      |  |
| NativeMethodsMixin       | ✓      |  |
| NativeModules            | (✓)    | Mocked. Missing ability to load native modules. |
| PanResponder             | ✓      |  |
| PixelRatio               | ✓      |  |
| Platform                 | ✓      |  |
| Settings                 | ✘      | No equivalent web APIs. |
| Share                    | ✓      | Only available over HTTPS. Read about the [Web Share API](https://wicg.github.io/web-share/). |
| StyleSheet               | ✓      |  |
| UIManager                | ✓      |  |
| Vibration                | ✓      |  |
| useColorScheme           | ✓      |  |
| useWindowDimensions      | ✓      |  |
