/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { createItemRow, Button } from '../helpers';

const ITEMS = [...Array(12)].map((_, i) => `Item ${i}`);

export default function OnScroll() {
  const scrollRef = React.useRef(null);
  return (
    <View>
      <ScrollView
        onScroll={() => {
          console.log('onScroll!');
        }}
        ref={scrollRef}
        scrollEventThrottle={200}
        style={styles.scrollView}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label="Scroll to top"
        onPress={() => {
          scrollRef.current.scrollTo({ y: 0 });
        }}
      />
      <Button
        label="Scroll to bottom"
        onPress={() => {
          scrollRef.current.scrollToEnd({ animated: true });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 300,
  },
  horizontalScrollView: {
    height: 106,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
