/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import type { ColorValue } from '../../types';
import createElement from '../createElement';

type Props = {
  color?: ColorValue,
  label: string,
  testID?: string,
  value?: number | string
};

export default function PickerItem({ color, label, testID, value }: Props) {
  const style = { color };
  return createElement('option', { style, testID, value }, label);
}
