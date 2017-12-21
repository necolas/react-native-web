/**
 * @flow
 */

import NetworkImage from './NetworkImage';
import React from 'react';
import sources from '../sources';

const ImageOnErrorExample = () => <NetworkImage logMethod="onError" source={sources.broken} />;

export default ImageOnErrorExample;
