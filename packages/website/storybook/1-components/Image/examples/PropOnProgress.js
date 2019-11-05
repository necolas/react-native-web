/**
 * @flow
 */

import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

const ImageOnProgressExample = () => (
  <NetworkImage logMethod="onProgress" source={createUncachedURI(sources.dynamic)} />
);

export default ImageOnProgressExample;
