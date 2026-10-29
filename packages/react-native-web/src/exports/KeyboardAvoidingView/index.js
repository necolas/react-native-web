/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';

import * as React from 'react';
import View from '../View';

type KeyboardAvoidingViewProps = {
  ...ViewProps,
  behavior?: 'height' | 'padding' | 'position',
  contentContainerStyle?: ViewProps['style'],
  keyboardVerticalOffset?: number,
  ref?: React.Ref<React.ElementRef<typeof View>>
};

const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps): React.Node => {
  const {
    /* eslint-disable */
    behavior,
    contentContainerStyle,
    keyboardVerticalOffset,
    /* eslint-enable */
    ...rest
  } = props;

  return <View {...rest} />;
};

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

export default KeyboardAvoidingView;
