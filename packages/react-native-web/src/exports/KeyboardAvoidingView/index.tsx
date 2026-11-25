/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ComponentRef, ReactNode, Ref } from 'react';

import View, { type ViewProps } from '../View';

type KeyboardAvoidingViewProps = ViewProps & {
  behavior?: 'height' | 'padding' | 'position';
  contentContainerStyle?: ViewProps['style'];
  keyboardVerticalOffset?: number;
  ref?: Ref<ComponentRef<typeof View>>;
};

const KeyboardAvoidingView = (props: KeyboardAvoidingViewProps): ReactNode => {
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
