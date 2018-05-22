import React from 'react';
import { storiesOf } from '../../ui-explorer';
import Sandbox from './Sandbox';

const SandboxScreen = () => <Sandbox />;

if (process.env.NODE_ENV !== 'production') {
  storiesOf('Example apps', module).add('Sandbox', SandboxScreen);
}
