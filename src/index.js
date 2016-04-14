import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import './apis/PanResponder/injectResponderEventPlugin'

// apis
import Animated from './apis/Animated'
import AppRegistry from './apis/AppRegistry'
import AppState from './apis/AppState'
import AsyncStorage from './apis/AsyncStorage'
import Clipboard from './apis/Clipboard'
import Dimensions from './apis/Dimensions'
import Easing from './apis/Easing'
import InteractionManager from './apis/InteractionManager'
import NetInfo from './apis/NetInfo'
import PanResponder from './apis/PanResponder'
import PixelRatio from './apis/PixelRatio'
import Platform from './apis/Platform'
import StyleSheet from './apis/StyleSheet'
import UIManager from './apis/UIManager'

// components
import ActivityIndicator from './components/ActivityIndicator'
import Image from './components/Image'
import ListView from './components/ListView'
import Portal from './components/Portal'
import ScrollView from './components/ScrollView'
import Text from './components/Text'
import TextInput from './components/TextInput'
import Touchable from './components/Touchable/Touchable'
import TouchableBounce from './components/Touchable/TouchableBounce'
import TouchableHighlight from './components/Touchable/TouchableHighlight'
import TouchableOpacity from './components/Touchable/TouchableOpacity'
import TouchableWithoutFeedback from './components/Touchable/TouchableWithoutFeedback'
import View from './components/View'

// modules
import NativeModules from './modules/NativeModules'

// propTypes

import ColorPropType from './apis/StyleSheet/ColorPropType'
import EdgeInsetsPropType from './apis/StyleSheet/EdgeInsetsPropType'
import PointPropType from './apis/StyleSheet/PointPropType'

const ReactNative = {
  // apis
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  Clipboard,
  Dimensions,
  Easing,
  InteractionManager,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,

  // components
  ActivityIndicator,
  Image,
  ListView,
  Portal,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableBounce,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,

  // modules
  NativeModules,

  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,

  // React
  ...React,
  ...ReactDOM,
  ...ReactDOMServer
}

module.exports = ReactNative
