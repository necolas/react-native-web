import findNodeHandle from './modules/findNodeHandle';
import { render, unmountComponentAtNode } from 'react-dom';

// APIs
import I18nManager from './apis/I18nManager';
import Platform from './apis/Platform';
import StyleSheet from './apis/StyleSheet';

// components
import Image from './components/Image';
import Text from './components/Text';
import TextInput from './components/TextInput';
import Touchable from './components/Touchable/Touchable';
import TouchableHighlight from './components/Touchable/TouchableHighlight';
import TouchableOpacity from './components/Touchable/TouchableOpacity';
import TouchableWithoutFeedback from './components/Touchable/TouchableWithoutFeedback';
import View from './components/View';

// modules
import createDOMElement from './modules/createDOMElement';
import modality from './modules/modality';

modality();

const ReactNativeCore = {
  createDOMElement,
  findNodeHandle,
  render,
  unmountComponentAtNode,
  // APIs
  I18nManager,
  Platform,
  StyleSheet,
  // components
  Image,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
};

module.exports = ReactNativeCore;
