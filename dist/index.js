'use strict';

require('./apis/PanResponder/injectResponderEventPlugin');

var _Animated = require('./apis/Animated');

var _Animated2 = _interopRequireDefault(_Animated);

var _AppRegistry = require('./apis/AppRegistry');

var _AppRegistry2 = _interopRequireDefault(_AppRegistry);

var _AppState = require('./apis/AppState');

var _AppState2 = _interopRequireDefault(_AppState);

var _AsyncStorage = require('./apis/AsyncStorage');

var _AsyncStorage2 = _interopRequireDefault(_AsyncStorage);

var _Dimensions = require('./apis/Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

var _Easing = require('./apis/Easing');

var _Easing2 = _interopRequireDefault(_Easing);

var _InteractionManager = require('./apis/InteractionManager');

var _InteractionManager2 = _interopRequireDefault(_InteractionManager);

var _NetInfo = require('./apis/NetInfo');

var _NetInfo2 = _interopRequireDefault(_NetInfo);

var _PanResponder = require('./apis/PanResponder');

var _PanResponder2 = _interopRequireDefault(_PanResponder);

var _PixelRatio = require('./apis/PixelRatio');

var _PixelRatio2 = _interopRequireDefault(_PixelRatio);

var _Platform = require('./apis/Platform');

var _Platform2 = _interopRequireDefault(_Platform);

var _StyleSheet = require('./apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _UIManager = require('./apis/UIManager');

var _UIManager2 = _interopRequireDefault(_UIManager);

var _ActivityIndicator = require('./components/ActivityIndicator');

var _ActivityIndicator2 = _interopRequireDefault(_ActivityIndicator);

var _Image = require('./components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _ListView = require('./components/ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _Portal = require('./components/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _ScrollView = require('./components/ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _Text = require('./components/Text');

var _Text2 = _interopRequireDefault(_Text);

var _TextInput = require('./components/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Touchable = require('./components/Touchable/Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

var _TouchableBounce = require('./components/Touchable/TouchableBounce');

var _TouchableBounce2 = _interopRequireDefault(_TouchableBounce);

var _TouchableHighlight = require('./components/Touchable/TouchableHighlight');

var _TouchableHighlight2 = _interopRequireDefault(_TouchableHighlight);

var _TouchableOpacity = require('./components/Touchable/TouchableOpacity');

var _TouchableOpacity2 = _interopRequireDefault(_TouchableOpacity);

var _TouchableWithoutFeedback = require('./components/Touchable/TouchableWithoutFeedback');

var _TouchableWithoutFeedback2 = _interopRequireDefault(_TouchableWithoutFeedback);

var _View = require('./components/View');

var _View2 = _interopRequireDefault(_View);

var _NativeModules = require('./modules/NativeModules');

var _NativeModules2 = _interopRequireDefault(_NativeModules);

var _ColorPropType = require('./apis/StyleSheet/ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _EdgeInsetsPropType = require('./apis/StyleSheet/EdgeInsetsPropType');

var _EdgeInsetsPropType2 = _interopRequireDefault(_EdgeInsetsPropType);

var _PointPropType = require('./apis/StyleSheet/PointPropType');

var _PointPropType2 = _interopRequireDefault(_PointPropType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// modules


// apis


var ReactNative = {
  // apis
  Animated: _Animated2.default,
  AppRegistry: _AppRegistry2.default,
  AppState: _AppState2.default,
  AsyncStorage: _AsyncStorage2.default,
  Dimensions: _Dimensions2.default,
  Easing: _Easing2.default,
  InteractionManager: _InteractionManager2.default,
  NetInfo: _NetInfo2.default,
  PanResponder: _PanResponder2.default,
  PixelRatio: _PixelRatio2.default,
  Platform: _Platform2.default,
  StyleSheet: _StyleSheet2.default,
  UIManager: _UIManager2.default,

  // components
  ActivityIndicator: _ActivityIndicator2.default,
  Image: _Image2.default,
  ListView: _ListView2.default,
  Portal: _Portal2.default,
  ScrollView: _ScrollView2.default,
  Text: _Text2.default,
  TextInput: _TextInput2.default,
  Touchable: _Touchable2.default,
  TouchableBounce: _TouchableBounce2.default,
  TouchableHighlight: _TouchableHighlight2.default,
  TouchableOpacity: _TouchableOpacity2.default,
  TouchableWithoutFeedback: _TouchableWithoutFeedback2.default,
  View: _View2.default,

  // modules
  NativeModules: _NativeModules2.default,

  // propTypes
  ColorPropType: _ColorPropType2.default,
  EdgeInsetsPropType: _EdgeInsetsPropType2.default,
  PointPropType: _PointPropType2.default
};

// propTypes

// components


module.exports = ReactNative;