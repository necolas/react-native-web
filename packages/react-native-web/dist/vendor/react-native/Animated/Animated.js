function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
import Platform from '../../../exports/Platform';
import FlatList from './components/AnimatedFlatList';
import Image from './components/AnimatedImage';
import ScrollView from './components/AnimatedScrollView';
import SectionList from './components/AnimatedSectionList';
import Text from './components/AnimatedText';
import View from './components/AnimatedView';
import AnimatedMock from './AnimatedMock';
import AnimatedImplementation from './AnimatedImplementation';
var Animated = Platform.isTesting ? AnimatedMock : AnimatedImplementation;
export default _objectSpread({
  FlatList: FlatList,
  Image: Image,
  ScrollView: ScrollView,
  SectionList: SectionList,
  Text: Text,
  View: View
}, Animated);