import findNodeHandle from './modules/findNodeHandle';
import { render, unmountComponentAtNode } from 'react/lib/ReactMount';

// APIs
import I18nManager from './apis/I18nManager';
import StyleSheet from './apis/StyleSheet';

// components
import Image from './components/Image';
import Text from './components/Text';
import TextInput from './components/TextInput';
import View from './components/View';

const ReactNativeCore = {
  findNodeHandle,
  render,
  unmountComponentAtNode,
  // APIs
  I18nManager,
  StyleSheet,
  // components
  Image,
  Text,
  TextInput,
  View
};

module.exports = ReactNativeCore;
