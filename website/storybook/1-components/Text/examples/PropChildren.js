/* eslint-disable react/prop-types */

/**
 * @flow
 */

import React from 'react';
import { Image, Text, View } from 'react-native';

const Entity = ({ children }) => (
  <Text style={{ fontWeight: '500', color: '#527fe4' }}>{children}</Text>
);

const TextChildrenExample = () => (
  <View>
    <Text>
      This text contains an inline blue view{' '}
      <View style={{ width: 25, height: 25, backgroundColor: 'steelblue' }} /> and an inline image{' '}
      <Image
        source={{ uri: 'http://lorempixel.com/30/11' }}
        style={{ width: 30, height: 11, resizeMode: 'cover' }}
      />
      . Neat, huh?
    </Text>

    <View>
      <Text>
        (Normal text,
        <Text style={{ fontWeight: 'bold' }}>
          (and bold
          <Text style={{ fontSize: 11, color: '#527fe4' }}>(and tiny inherited bold blue)</Text>
          )
        </Text>
        )
      </Text>
      <Text style={{ opacity: 0.7 }}>
        (opacity
        <Text>
          (is inherited
          <Text style={{ opacity: 0.7 }}>
            {'\n'}
            (and accumulated
            <Text style={{ backgroundColor: '#ffaaaa' }}>(and also applies to the background)</Text>
            )
          </Text>
          )
        </Text>
        )
      </Text>
      <Text style={{ fontSize: 12 }}>
        <Entity>Entity Name</Entity>
      </Text>
    </View>
  </View>
);

export default TextChildrenExample;
