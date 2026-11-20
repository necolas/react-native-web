/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Platform from '../../../exports/Platform';
type AnimatedFlatList = typeof import('./components/AnimatedFlatList').default;
type AnimatedImage = typeof import('./components/AnimatedImage').default;
type AnimatedScrollView = typeof import('./components/AnimatedScrollView').default;
type AnimatedSectionList = typeof import('./components/AnimatedSectionList').default;
type AnimatedText = typeof import('./components/AnimatedText').default;
type AnimatedView = typeof import('./components/AnimatedView').default;

import FlatList from './components/AnimatedFlatList';
import Image from './components/AnimatedImage';
import ScrollView from './components/AnimatedScrollView';
import SectionList from './components/AnimatedSectionList';
import Text from './components/AnimatedText';
import View from './components/AnimatedView';

import AnimatedMock from './AnimatedMock';
import AnimatedImplementation from './AnimatedImplementation';

const Animated = Platform.isTesting ? AnimatedMock : AnimatedImplementation;

export default {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  View,
  ...Animated,
};
