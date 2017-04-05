import createDOMElement from './modules/createDOMElement';
import findNodeHandle from './modules/findNodeHandle';
import modality from './modules/modality';
import NativeModules from './modules/NativeModules';
import processColor from './modules/processColor';
import { render, unmountComponentAtNode } from 'react-dom';

// APIs
import Animated from './apis/Animated';
import AppRegistry from './apis/AppRegistry';
import AppState from './apis/AppState';
import AsyncStorage from './apis/AsyncStorage';
import BackAndroid from './apis/BackAndroid';
import Clipboard from './apis/Clipboard';
import Dimensions from './apis/Dimensions';
import Easing from 'animated/lib/Easing';
import I18nManager from './apis/I18nManager';
import InteractionManager from './apis/InteractionManager';
import Linking from './apis/Linking';
import NetInfo from './apis/NetInfo';
import PanResponder from './apis/PanResponder';
import PixelRatio from './apis/PixelRatio';
import Platform from './apis/Platform';
import StyleSheet from './apis/StyleSheet';
import UIManager from './apis/UIManager';
import Vibration from './apis/Vibration';

// components
import ActivityIndicator from './components/ActivityIndicator';
import Button from './components/Button';
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

// propTypes
import ColorPropType from './propTypes/ColorPropType';
import EdgeInsetsPropType from './propTypes/EdgeInsetsPropType';
import PointPropType from './propTypes/PointPropType';
import ViewPropTypes from './components/View/ViewPropTypes';

modality();

const ReactNative = {
  // top-level API
  findNodeHandle,
  render,
  unmountComponentAtNode,

  // modules
  createDOMElement,
  NativeModules,
  processColor,

  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackAndroid,
  Clipboard,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Linking,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,
  Vibration,

  // components
  ActivityIndicator,
  Button,
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

  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  ViewPropTypes
};

module.exports = ReactNative;
