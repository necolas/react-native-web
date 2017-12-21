/**
 * @flow
 */

import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

const ImageOnLoadEndExample = () => (
  <NetworkImage logMethod="onLoadEnd" source={createUncachedURI(sources.largeAlt)} />
);

export default ImageOnLoadEndExample;
