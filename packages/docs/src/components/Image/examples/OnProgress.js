import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

export default function OnProgress() {
  return <NetworkImage logMethod="onProgress" source={createUncachedURI(sources.dynamic)} />;
}
