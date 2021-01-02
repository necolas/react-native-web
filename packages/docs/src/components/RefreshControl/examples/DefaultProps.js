/* eslint-disable react/jsx-no-bind */

'use strict';

import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DefaultProps() {
  return (
    <View>
      <ScrollView refreshControl={<RefreshControl />} style={styles.scrollView}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra facilisis varius. Nam
          nibh urna, varius eget pharetra at, tincidunt eu est. Vestibulum condimentum convallis
          neque vel tincidunt. Aenean in mi ut tortor dictum tincidunt. Fusce et tristique justo.
          Aliquam finibus ligula nec porttitor iaculis. Fusce pharetra enim a lacus semper aliquet.
          Aliquam a arcu iaculis, dignissim felis non, dapibus velit. Donec orci enim, scelerisque
          eget posuere et, ultrices at ipsum. Donec at enim hendrerit, eleifend lectus et, varius
          lacus. Mauris laoreet quis augue id tincidunt. Ut quis aliquet lectus. Sed ac metus
          eleifend, gravida orci a, varius ante. Etiam consequat blandit euismod. In scelerisque mi
          odio, in placerat nisi lobortis in. Maecenas laoreet et orci porttitor gravida. Nam
          varius, quam vulputate sagittis vulputate, nibh enim ornare elit, quis tempus diam tortor
          sit amet neque. Mauris ante metus, dapibus at leo at, suscipit posuere risus. Phasellus id
          gravida elit, eget pulvinar sem. Integer eget aliquam metus. Vivamus placerat mauris
          massa, non varius velit interdum id. Integer ut velit non turpis vehicula posuere.
          Phasellus tempor malesuada justo, a auctor quam pellentesque vel. Nullam tempor, nibh at
          vestibulum lobortis, velit urna aliquet lectus, imperdiet porttitor diam felis eget purus.
          Vestibulum a fermentum metus. Nullam tincidunt, enim feugiat ornare semper, nibh sapien
          faucibus nulla, vitae lacinia metus sem ac magna. Pellentesque quis ullamcorper lectus.
          Mauris id tempus nisl.
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
