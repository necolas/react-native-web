/**
 * @flow
 */

import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

const ImageOnLoadExample = () => (
  <NetworkImage logMethod="onLoad" source={createUncachedURI(sources.largeAlt)} />
);

export default ImageOnLoadExample;
