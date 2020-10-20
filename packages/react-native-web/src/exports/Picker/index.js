/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';

import createElement from '../createElement';
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../modules/usePlatformMethods';
import PickerItem from './PickerItem';
import StyleSheet, { type StyleObj } from '../StyleSheet';
import { forwardRef, useRef } from 'react';

type PickerProps = {
  ...ViewProps,
  children?: PickerItem | Array<typeof PickerItem>,
  enabled?: boolean,
  onValueChange?: (number | string, number) => void,
  selectedValue?: number | string,
  style?: StyleObj,
  /* compat */
  itemStyle?: StyleObj,
  mode?: string,
  prompt?: string
};

const Picker = forwardRef<PickerProps, *>((props, forwardedRef) => {
  const {
    children,
    enabled,
    onValueChange,
    selectedValue,
    style,
    testID,
    /* eslint-disable */
    itemStyle,
    mode,
    prompt,
    /* eslint-enable */
    ...other
  } = props;

  const hostRef = useRef(null);

  function handleChange(e: Object) {
    const { selectedIndex, value } = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  const supportedProps: any = {
    children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    style: [styles.initial, style],
    testID,
    value: selectedValue,
    ...other
  };

  // Style is subject to frequent change and inline creation, plus we only need its value if the user actually calls setNativeProps,
  // so we can instead use a ref here which will be present when needed, but ref-equivilant for setting ref and platform methods
  const setNativePropsStyles = useRef(null);
  setNativePropsStyles.current = {
    classList: supportedProps.classList,
    pointerEvents: supportedProps.pointerEvents,
    style: supportedProps.style
  };
  const platformMethodsRef = usePlatformMethods(setNativePropsStyles);

  const setRef = useMergeRefs(hostRef, platformMethodsRef, forwardedRef);

  supportedProps.ref = setRef;

  return createElement('select', supportedProps);
});

// $FlowFixMe
Picker.Item = PickerItem;

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});

export default Picker;
