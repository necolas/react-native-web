/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { useContext } from 'react';
import type { ColorValue } from '../../types';
import StyleSheetContext from '../StyleSheet/StyleSheetContext';

import createElement from '../createElement';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  value?: number | string
};

export default function PickerItem(props: Props) {
  const { color, label, testID, value } = props;
  const style = { color };
  const styleContext = useContext(StyleSheetContext);

  return createElement('option', { style, testID, value }, styleContext.styleResolver, label);
}
