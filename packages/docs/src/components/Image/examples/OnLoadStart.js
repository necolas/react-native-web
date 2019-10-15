import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

export default function OnLoadStart() {
  return <NetworkImage logMethod="onLoadStart" source={createUncachedURI(sources.largeAlt)} />;
}
