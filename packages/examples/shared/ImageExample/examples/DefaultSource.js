import * as helpers from '../helpers';
import sources from '../sources';
import React from 'react';
import { Image } from 'react-native';

export default function Source() {
  return <Image defaultSource={sources.placeholder} style={helpers.styles.base} />;
}
