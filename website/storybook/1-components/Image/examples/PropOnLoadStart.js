/**
 * @flow
 */

import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

const ImageOnLoadStartExample = () => (
  <NetworkImage logMethod="onLoadStart" source={createUncachedURI(sources.largeAlt)} />
);

export default ImageOnLoadStartExample;
