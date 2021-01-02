/* eslint-disable react/jsx-no-bind */

'use strict';

import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Refreshing() {
  return (
    <View>
      <ScrollView refreshControl={<RefreshControl refreshing />} style={styles.scrollView}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra facilisis varius. Nam
          nibh urna, varius eget pharetra at, tincidunt eu est. Vestibulum condimentum convallis
          neque vel tincidunt. Aenean in mi ut tortor dictum tincidunt. Fusce et tristique justo.
          Aliquam finibus ligula nec porttitor iaculis. Fusce pharetra enim a lacus semper aliquet.
          Aliquam a arcu iaculis, dignissim felis non, dapibus velit. Donec orci enim, scelerisque
          eget posuere et, ultrices at ipsum. Donec at enim hendrerit, eleifend lectus et, varius
          lacus.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: 400,
    backgroundColor: '#eeeeee',
    height: 200
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  }
});
