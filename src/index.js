import findNodeHandle from './modules/findNodeHandle';
import { render, unmountComponentAtNode } from 'react/lib/ReactMount';

// APIs
import Animated from './apis/Animated';
import AppRegistry from './apis/AppRegistry';
import AppState from './apis/AppState';
import AsyncStorage from './apis/AsyncStorage';
import Dimensions from './apis/Dimensions';
import Easing from 'animated/lib/Easing';
import I18nManager from './apis/I18nManager';
import InteractionManager from './apis/InteractionManager';
import NetInfo from './apis/NetInfo';
import PanResponder from './apis/PanResponder';
import PixelRatio from './apis/PixelRatio';
import Platform from './apis/Platform';
import StyleSheet from './apis/StyleSheet';
import UIManager from './apis/UIManager';
import Vibration from './apis/Vibration';

// components
import ActivityIndicator from './components/ActivityIndicator';
import Image from './components/Image';
import ListView from './components/ListView';
import ProgressBar from './components/ProgressBar';
import ScrollView from './components/ScrollView';
import Switch from './components/Switch';
import Text from './components/Text';
import TextInput from './components/TextInput';
import Touchable from './components/Touchable/Touchable';
import TouchableHighlight from './components/Touchable/TouchableHighlight';
import TouchableOpacity from './components/Touchable/TouchableOpacity';
import TouchableWithoutFeedback from './components/Touchable/TouchableWithoutFeedback';
import View from './components/View';

// modules
import createDOMElement from './modules/createDOMElement';
import NativeModules from './modules/NativeModules';

// propTypes
import ColorPropType from './propTypes/ColorPropType';
import EdgeInsetsPropType from './propTypes/EdgeInsetsPropType';
import PointPropType from './propTypes/PointPropType';

const ReactNative = {
  // top-level API
  findNodeHandle,
  render,
  unmountComponentAtNode,

  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,
  Vibration,

  // components
  ActivityIndicator,
  Image,
  ListView,
  ProgressBar,
  ScrollView,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,

  // modules
  createDOMElement,
  NativeModules,

  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType
};

module.exports = ReactNative;
