import { createUncachedURI } from '../helpers';
import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

export default function OnLoad() {
  return <NetworkImage logMethod="onLoad" source={createUncachedURI(sources.largeAlt)} />;
}
