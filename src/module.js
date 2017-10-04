import createElement from './modules/createElement';
import findNodeHandle from './modules/findNodeHandle';
import NativeModules from './modules/NativeModules';
import processColor from './modules/processColor';
import { hydrate, render, unmountComponentAtNode } from 'react-dom';

// APIs
import Animated from './apis/Animated';
import AppRegistry from './apis/AppRegistry';
import AppState from './apis/AppState';
import AsyncStorage from './apis/AsyncStorage';
import BackHandler from './apis/BackHandler';
import Clipboard from './apis/Clipboard';
import Dimensions from './apis/Dimensions';
import Easing from './apis/Easing';
import I18nManager from './apis/I18nManager';
import Keyboard from './apis/Keyboard';
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
import FlatList from './components/FlatList';
import Image from './components/Image';
import KeyboardAvoidingView from './components/KeyboardAvoidingView';
import ListView from './components/ListView';
import Modal from './components/Modal';
import Picker from './components/Picker';
import ProgressBar from './components/ProgressBar';
import RefreshControl from './components/RefreshControl';
import ScrollView from './components/ScrollView';
import SectionList from './components/SectionList';
import Slider from './components/Slider';
import StatusBar from './components/StatusBar';
import Switch from './components/Switch';
import Text from './components/Text';
import TextInput from './components/TextInput';
import Touchable from './components/Touchable/Touchable';
import TouchableHighlight from './components/Touchable/TouchableHighlight';
import TouchableNativeFeedback from './components/Touchable/TouchableNativeFeedback';
import TouchableOpacity from './components/Touchable/TouchableOpacity';
import TouchableWithoutFeedback from './components/Touchable/TouchableWithoutFeedback';
import View from './components/View';
import VirtualizedList from './components/VirtualizedList';

// propTypes
import ColorPropType from './propTypes/ColorPropType';
import EdgeInsetsPropType from './propTypes/EdgeInsetsPropType';
import PointPropType from './propTypes/PointPropType';
import TextPropTypes from './components/Text/TextPropTypes';
import ViewPropTypes from './components/View/ViewPropTypes';

export {
  // top-level API
  findNodeHandle,
  hydrate,
  render,
  unmountComponentAtNode,
  // modules
  createElement,
  NativeModules,
  processColor,
  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackHandler,
  Clipboard,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Keyboard,
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
  FlatList,
  Image,
  KeyboardAvoidingView,
  ListView,
  Modal,
  Picker,
  ProgressBar,
  RefreshControl,
  ScrollView,
  SectionList,
  Slider,
  StatusBar,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  TextPropTypes,
  ViewPropTypes
};

const ReactNative = {
  // top-level API
  findNodeHandle,
  hydrate,
  render,
  unmountComponentAtNode,

  // modules
  createElement,
  NativeModules,
  processColor,

  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackHandler,
  Clipboard,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Keyboard,
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
  FlatList,
  Image,
  KeyboardAvoidingView,
  ListView,
  Modal,
  Picker,
  ProgressBar,
  RefreshControl,
  ScrollView,
  SectionList,
  Slider,
  StatusBar,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,

  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  TextPropTypes,
  ViewPropTypes
};

export default ReactNative;
