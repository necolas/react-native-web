/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import type { ViewProps } from '../View';
import View from '../View';

type KeyboardAvoidingViewProps = ViewProps & {
  behavior?: 'height' | 'padding' | 'position';
  contentContainerStyle?: ViewProps['style'];
  keyboardVerticalOffset?: number;
  ref?: React.Ref<React.ComponentRef<typeof View>>;
};

const KeyboardAvoidingView = (
  props: KeyboardAvoidingViewProps
): React.ReactNode => {
  const {
    /* oxlint-disable no-unused-vars */
    behavior,
    contentContainerStyle,
    keyboardVerticalOffset,
    /* oxlint-enable no-unused-vars */
    ...rest
  } = props;

  return <View {...rest} />;
};

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

export default KeyboardAvoidingView;
