/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @providesModule RNTesterList
 */
'use strict';

export type RNTesterExample = {
  key: string,
  module: Object,
  supportsTVOS: boolean
};

const ComponentExamples: Array<RNTesterExample> = [
  {
    key: 'ActivityIndicatorExample',
    module: require('./ActivityIndicatorExample')
  },
  {
    key: 'ARTExample',
    module: require('./ARTExample')
  },
  {
    key: 'ButtonExample',
    module: require('./ButtonExample')
  },
  {
    key: 'FlatListExample',
    module: require('./FlatListExample')
  },
  {
    key: 'MultiColumnExample',
    module: require('./MultiColumnExample')
  },
  {
    key: 'ImageExample',
    module: require('./ImageExample')
  },
  //{
  //  key: 'InputAccessoryViewExample',
  //  module: require('./InputAccessoryViewExample'),
  //},
  //{
  //  key: 'KeyboardAvoidingViewExample',
  //  module: require('./KeyboardAvoidingViewExample'),
  //},
  {
    key: 'ListViewExample',
    module: require('./ListViewExample')
  },
  {
    key: 'ListViewGridLayoutExample',
    module: require('./ListViewGridLayoutExample'),
  },
  {
    key: 'ListViewPagingExample',
    module: require('./ListViewPagingExample'),
  },
  //{
  //  key: 'MaskedViewExample',
  //  module: require('./MaskedViewExample'),
  //},
  //{
  //  key: 'ModalExample',
  //  module: require('./ModalExample'),
  //},

  {
    key: 'PickerExample',
    module: require('./PickerExample')
  },
  //{
  //  key: 'RefreshControlExample',
  //  module: require('./RefreshControlExample'),
  //},
  {
    key: 'SafeAreaViewExample',
    module: require('./SafeAreaViewExample')
  },
  {
    key: 'ScrollViewExample',
    module: require('./ScrollViewExample')
  },
  {
    key: 'SectionListExample',
    module: require('./SectionListExample')
  },
  //{
  //  key: 'SliderExample',
  //  module: require('./SliderExample'),
  //},
  {
    key: 'StatusBarExample',
    module: require('./StatusBarExample')
  },
  {
    key: 'SwipeableFlatListExample',
    module: require('./SwipeableFlatListExample'),
  },
  {
    key: 'SwipeableListViewExample',
    module: require('./SwipeableListViewExample'),
  },
  {
    key: 'SwitchExample',
    module: require('./SwitchExample')
  },
  {
    key: 'TextExample',
    module: require('./TextExample')
  },
  {
    key: 'TextInputExample',
    module: require('./TextInputExample')
  },
  {
    key: 'TouchableExample',
    module: require('./TouchableExample')
  },
  //{
  //  key: 'TransparentHitTestExample',
  //  module: require('./TransparentHitTestExample')
  //},
  {
    key: 'ViewExample',
    module: require('./ViewExample')
  },
  //{
  //  key: 'WebViewExample',
  //  module: require('./WebViewExample'),
  //},
  {
    key: 'LayoutEventsExample',
    module: require('./LayoutEventsExample')
  },
];

const APIExamples: Array<RNTesterExample> = [
  //{
  //  key: 'AlertExample',
  //  module: require('./AlertExample').AlertExample,
  //},
  {
    key: 'AnimatedExample',
    module: require('./AnimatedExample')
  },
  //{
  //  key: 'AnExApp',
  //  module: require('./AnimatedGratuitousApp/AnExApp'),
  //},
  {
    key: 'AppStateExample',
    module: require('./AppStateExample')
  },
  {
    key: 'AsyncStorageExample',
    module: require('./AsyncStorageExample')
  },
  {
    key: 'BorderExample',
    module: require('./BorderExample')
  },
  {
    key: 'BoxShadowExample',
    module: require('./BoxShadowExample')
  },
  //{
  //  key: 'CameraRollExample',
  //  module: require('./CameraRollExample'),
  //},
  {
    key: 'ClipboardExample',
    module: require('./ClipboardExample')
  },
  {
    key: 'Dimensions',
    module: require('./DimensionsExample')
  },
  {
    key: 'GeolocationExample',
    module: require('./GeolocationExample')
  },
  //{
  //  key: 'ImageEditingExample',
  //  module: require('./ImageEditingExample'),
  //},
  {
    key: 'LayoutAnimationExample',
    module: require('./LayoutAnimationExample')
  },
  {
    key: 'LayoutExample',
    module: require('./LayoutExample')
  },
  {
    key: 'LinkingExample',
    module: require('./LinkingExample')
  },
  {
    key: 'NativeAnimationsExample',
    module: require('./NativeAnimationsExample')
  },
  {
    key: 'NetInfoExample',
    module: require('./NetInfoExample')
  },
  //{
  //  key: 'OrientationChangeExample',
  //  module: require('./OrientationChangeExample'),
  //},
  {
    key: 'PanResponderExample',
    module: require('./PanResponderExample')
  },
  {
    key: 'PointerEventsExample',
    module: require('./PointerEventsExample')
  },
  {
    key: 'RTLExample',
    module: require('./RTLExample')
  },
  {
    key: 'ShareExample',
    module: require('./ShareExample')
  },
  {
    key: 'TimerExample',
    module: require('./TimerExample')
  },
  {
    key: 'TransformExample',
    module: require('./TransformExample')
  },
  {
    key: 'VibrationExample',
    module: require('./VibrationExample')
  },
  //{
  //  key: 'XHRExample',
  //  module: require('./XHRExample'),
  //  supportsTVOS: true,
  //},
];

const Modules = {};

APIExamples.concat(ComponentExamples).forEach(Example => {
  Modules[Example.key] = Example.module;
});

const RNTesterList = {
  APIExamples,
  ComponentExamples,
  Modules
};

module.exports = RNTesterList;
