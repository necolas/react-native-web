/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import source from '../sources/hawk.png';

export default function StyleBoxShadow() {
  return <Image source={source} style={styles.box} />;
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    overflow: 'visible',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 }
  }
});
