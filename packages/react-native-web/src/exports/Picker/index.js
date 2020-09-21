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
import usePlatformMethods from '../../hooks/usePlatformMethods';
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
  const setRef = useMergeRefs(forwardedRef, hostRef);

  function handleChange(e: Object) {
    const { selectedIndex, value } = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  const supportedProps = {
    children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    ref: setRef,
    style: [styles.initial, style],
    testID,
    value: selectedValue,
    ...other
  };

  usePlatformMethods(hostRef, supportedProps);

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
