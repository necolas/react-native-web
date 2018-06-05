import UnimplementedView from './modules/UnimplementedView';

import createElement from './exports/createElement';
import findNodeHandle from './exports/findNodeHandle';
import processColor from './exports/processColor';
import render from './exports/render';
import unmountComponentAtNode from './exports/unmountComponentAtNode';
import NativeModules from './exports/NativeModules';
import TextPropTypes from './exports/TextPropTypes';
import ViewPropTypes from './exports/ViewPropTypes';

// APIs
import AccessibilityInfo from './exports/AccessibilityInfo';
import Alert from './exports/Alert';
import Animated from './exports/Animated';
import AppRegistry from './exports/AppRegistry';
import AppState from './exports/AppState';
import AsyncStorage from './exports/AsyncStorage';
import BackHandler from './exports/BackHandler';
import Clipboard from './exports/Clipboard';
import DeviceInfo from './exports/DeviceInfo';
import Dimensions from './exports/Dimensions';
import Easing from './exports/Easing';
import I18nManager from './exports/I18nManager';
import Keyboard from './exports/Keyboard';
import InteractionManager from './exports/InteractionManager';
import LayoutAnimation from './exports/LayoutAnimation';
import Linking from './exports/Linking';
import NativeEventEmitter from './exports/NativeEventEmitter';
import NetInfo from './exports/NetInfo';
import PanResponder from './exports/PanResponder';
import PixelRatio from './exports/PixelRatio';
import Platform from './exports/Platform';
import Share from './exports/Share';
import StyleSheet from './exports/StyleSheet';
import UIManager from './exports/UIManager';
import Vibration from './exports/Vibration';

// components
import ActivityIndicator from './exports/ActivityIndicator';
import ART from './exports/ART';
import Button from './exports/Button';
import CheckBox from './exports/CheckBox';
import FlatList from './exports/FlatList';
import Image from './exports/Image';
import ImageBackground from './exports/ImageBackground';
import KeyboardAvoidingView from './exports/KeyboardAvoidingView';
import ListView from './exports/ListView';
import Modal from './exports/Modal';
import Picker from './exports/Picker';
import ProgressBar from './exports/ProgressBar';
import RefreshControl from './exports/RefreshControl';
import SafeAreaView from './exports/SafeAreaView';
import ScrollView from './exports/ScrollView';
import SectionList from './exports/SectionList';
import Slider from './exports/Slider';
import StatusBar from './exports/StatusBar';
import SwipeableFlatList from './exports/SwipeableFlatList';
import SwipeableListView from './exports/SwipeableListView';
import Switch from './exports/Switch';
import Text from './exports/Text';
import TextInput from './exports/TextInput';
import Touchable from './exports/Touchable';
import TouchableHighlight from './exports/TouchableHighlight';
import TouchableNativeFeedback from './exports/TouchableNativeFeedback';
import TouchableOpacity from './exports/TouchableOpacity';
import TouchableWithoutFeedback from './exports/TouchableWithoutFeedback';
import View from './exports/View';
import VirtualizedList from './exports/VirtualizedList';
import YellowBox from './exports/YellowBox';

// propTypes
import ColorPropType from './exports/ColorPropType';
import EdgeInsetsPropType from './exports/EdgeInsetsPropType';
import PointPropType from './exports/PointPropType';

const emptyObject = {};
// compat (components)
const DatePickerIOS = UnimplementedView;
const DrawerLayoutAndroid = UnimplementedView;
const ImageEditor = UnimplementedView;
const ImageStore = UnimplementedView;
const InputAccessoryView = UnimplementedView;
const MaskedViewIOS = UnimplementedView;
const NavigatorIOS = UnimplementedView;
const PickerIOS = Picker;
const ProgressBarAndroid = UnimplementedView;
const ProgressViewIOS = UnimplementedView;
const SegmentedControlIOS = UnimplementedView;
const SnapshotViewIOS = UnimplementedView;
const TabBarIOS = UnimplementedView;
const ToastAndroid = UnimplementedView;
const ToolbarAndroid = UnimplementedView;
const ViewPagerAndroid = UnimplementedView;
const WebView = UnimplementedView;
// compat (apis)
const ActionSheetIOS = emptyObject;
const AlertIOS = emptyObject;
const CameraRoll = emptyObject;
const DatePickerAndroid = emptyObject;
const ImagePickerIOS = emptyObject;
const PermissionsAndroid = emptyObject;
const PushNotificationIOS = emptyObject;
const Settings = emptyObject;
const StatusBarIOS = emptyObject;
const Systrace = emptyObject;
const TimePickerAndroid = emptyObject;
const TVEventHandler = emptyObject;
const VibrationIOS = emptyObject;

export {
  // top-level API
  createElement,
  findNodeHandle,
  render,
  unmountComponentAtNode,
  // modules
  processColor,
  NativeModules,
  TextPropTypes,
  ViewPropTypes,
  // APIs
  AccessibilityInfo,
  Alert,
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackHandler,
  Clipboard,
  DeviceInfo,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Keyboard,
  LayoutAnimation,
  Linking,
  NativeEventEmitter,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  Share,
  StyleSheet,
  UIManager,
  Vibration,
  // components
  ActivityIndicator,
  ART,
  Button,
  CheckBox,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ListView,
  Modal,
  Picker,
  ProgressBar,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  Slider,
  StatusBar,
  SwipeableFlatList,
  SwipeableListView,
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
  YellowBox,
  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  // compat (components)
  DatePickerIOS,
  DrawerLayoutAndroid,
  ImageEditor,
  ImageStore,
  InputAccessoryView,
  MaskedViewIOS,
  NavigatorIOS,
  PickerIOS,
  ProgressBarAndroid,
  ProgressViewIOS,
  SegmentedControlIOS,
  SnapshotViewIOS,
  TabBarIOS,
  ToastAndroid,
  ToolbarAndroid,
  ViewPagerAndroid,
  WebView,
  // compat (apis)
  ActionSheetIOS,
  AlertIOS,
  CameraRoll,
  DatePickerAndroid,
  ImagePickerIOS,
  PermissionsAndroid,
  PushNotificationIOS,
  Settings,
  StatusBarIOS,
  Systrace,
  TimePickerAndroid,
  TVEventHandler,
  VibrationIOS
};

const ReactNative = {
  // top-level API
  createElement,
  findNodeHandle,
  render,
  unmountComponentAtNode,
  // modules
  processColor,
  NativeModules,
  TextPropTypes,
  ViewPropTypes,
  // APIs
  AccessibilityInfo,
  Alert,
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackHandler,
  Clipboard,
  DeviceInfo,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Keyboard,
  LayoutAnimation,
  Linking,
  NativeEventEmitter,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  Share,
  StyleSheet,
  UIManager,
  Vibration,
  // components
  ActivityIndicator,
  ART,
  Button,
  CheckBox,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ListView,
  Modal,
  Picker,
  ProgressBar,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  Slider,
  StatusBar,
  SwipeableFlatList,
  SwipeableListView,
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
  YellowBox,
  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  // compat (components)
  DatePickerIOS,
  DrawerLayoutAndroid,
  ImageEditor,
  ImageStore,
  InputAccessoryView,
  MaskedViewIOS,
  NavigatorIOS,
  PickerIOS,
  ProgressBarAndroid,
  ProgressViewIOS,
  SegmentedControlIOS,
  SnapshotViewIOS,
  TabBarIOS,
  ToastAndroid,
  ToolbarAndroid,
  ViewPagerAndroid,
  WebView,
  // compat (apis)
  ActionSheetIOS,
  AlertIOS,
  CameraRoll,
  DatePickerAndroid,
  ImagePickerIOS,
  PermissionsAndroid,
  PushNotificationIOS,
  Settings,
  StatusBarIOS,
  Systrace,
  TimePickerAndroid,
  TVEventHandler,
  VibrationIOS
};

export default ReactNative;
