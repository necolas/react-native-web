import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

// apis
import AppRegistry from './apis/AppRegistry'
import AppState from './apis/AppState'
import AsyncStorage from './apis/AsyncStorage'
import Dimensions from './apis/Dimensions'
import NetInfo from './apis/NetInfo'
import PixelRatio from './apis/PixelRatio'
import Platform from './apis/Platform'
import StyleSheet from './apis/StyleSheet'

// components
import ActivityIndicator from './components/ActivityIndicator'
import Image from './components/Image'
import ListView from './components/ListView'
import Portal from './components/Portal'
import ScrollView from './components/ScrollView'
import Text from './components/Text'
import TextInput from './components/TextInput'
import Touchable from './components/Touchable'
import View from './components/View'

const ReactNative = {
  // apis
  AppRegistry,
  AppState,
  AsyncStorage,
  Dimensions,
  NetInfo,
  PixelRatio,
  Platform,
  StyleSheet,

  // components
  ActivityIndicator,
  Image,
  ListView,
  Portal,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight: Touchable,
  TouchableOpacity: Touchable,
  TouchableWithoutFeedback: Touchable,
  View,

  // React
  ...React,
  ...ReactDOM,
  ...ReactDOMServer
}

module.exports = ReactNative
