import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

export default function OnError() {
  return <NetworkImage logMethod="onError" source={sources.broken} />;
}
