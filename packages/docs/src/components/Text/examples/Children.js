/* eslint-disable react/prop-types */
import React from 'react';
import { Image, Text, View } from 'react-native';

const Spacer = () => <View style={{ height: '1rem' }} />;

export default function Children() {
  return (
    <View>
      <Text>
        Text wraps across multiple lines by default. Text wraps across multiple lines by default.
        Text wraps across multiple lines by default. Text wraps across multiple lines by default.
      </Text>

      <Spacer />

      <Text>
        (Text inherits styles from parent Text elements,
        <Text style={{ fontWeight: 'bold' }}>
          {'\n  '}
          (for example this text is bold
          <Text style={{ fontSize: 11, color: '#527fe4' }}>
            {'\n    '}
            (and this text inherits the bold while setting size and color)
          </Text>
          {'\n  '})
        </Text>
        {'\n'})
      </Text>

      <Spacer />

      <Text style={{ opacity: 0.7 }}>
        (Text opacity
        <Text>
          {'\n  '}
          (is inherited
          <Text style={{ opacity: 0.7 }}>
            {'\n    '}
            (and accumulated
            <Text style={{ backgroundColor: '#ffaaaa' }}>
              {'\n      '}
              (and also applies to the background)
            </Text>
            {'\n    '})
          </Text>
          {'\n  '})
        </Text>
        {'\n'})
      </Text>

      <Spacer />

      <Text>
        This text contains an inline blue view{' '}
        <View style={{ width: 25, height: 25, backgroundColor: 'steelblue' }} /> and an inline image{' '}
        <Image
          source={{ uri: 'http://lorempixel.com/30/11' }}
          style={{ width: 30, height: 11, resizeMode: 'cover' }}
        />
        .
      </Text>

      <Spacer />

      <Text>
        This text contains a view{' '}
        <View style={{ borderColor: 'red', borderWidth: 1 }}>
          <Text style={{ borderColor: 'blue', borderWidth: 1 }}>which contains</Text>
          <Text style={{ borderColor: 'green', borderWidth: 1 }}>another text.</Text>
          <Text style={{ borderColor: 'yellow', borderWidth: 1 }}>
            And contains another view
            <View style={{ borderColor: 'red', borderWidth: 1 }}>
              <Text style={{ borderColor: 'blue', borderWidth: 1 }}>
                which contains another text!
              </Text>
            </View>
          </Text>
        </View>{' '}
        And then continues as text.
      </Text>
    </View>
  );
}
