/**
 * @flow
 */

import * as helpers from '../helpers';
import sources from '../sources';
import React from 'react';
import { Image } from 'react-native';

const ImageDefaultSourceExample = () => (
  <Image defaultSource={sources.placeholder} style={helpers.styles.base} />
);

export default ImageDefaultSourceExample;
