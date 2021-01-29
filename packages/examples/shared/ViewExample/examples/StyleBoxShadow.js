/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function StyleBoxShadow() {
  return (
    <View style={styles.row}>
      <View style={[styles.box, styles.shadow1]} />
      <View style={[styles.box, styles.shadow2]} />
      <View style={[styles.box, styles.shadow1, { borderRadius: 50 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderWidth: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  shadow1: {
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 }
  },
  shadow2: {
    shadowOpacity: 1.0,
    shadowColor: 'red',
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 }
  }
});
