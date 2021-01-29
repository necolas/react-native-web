import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

export default function OnLoadEnd() {
  return <NetworkImage logMethod="onLoadEnd" source={createUncachedURI(sources.largeAlt)} />;
}
