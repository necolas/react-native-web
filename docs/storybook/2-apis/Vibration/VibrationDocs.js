/**
 * @flow
 */

import { storiesOf } from '@kadira/storybook';
import React from 'react';
import UIExplorer, { AppText, Code, DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Methods',
    entries: [
      <DocItem description="Stop the vibration" name="static cancel" typeInfo="() => void" />,

      <DocItem
        description="Start the vibration pattern"
        name="static vibrate"
        typeInfo="(pattern) => void"
      />
    ]
  },
  {
    title: 'Examples',
    entries: [
      <DocItem
        description="Vibrate once for 200ms"
        example={{
          code: `Vibration.vibrate(200);
Vibration.vibrate([200]);`
        }}
      />,

      <DocItem
        description="Vibrate for 200ms, pause for 100ms, vibrate for 200ms:"
        example={{
          code: 'Vibration.vibrate([200, 100, 200]);'
        }}
      />
    ]
  }
];

storiesOf('APIs', module).add('Vibration', () =>
  <UIExplorer
    description={[
      <AppText>
        Vibration is described as a pattern of on-off pulses, which may be of
        varying lengths. The pattern may consist of either a single integer,
        describing the number of milliseconds to vibrate, or an array of
        integers describing a pattern of vibrations and pauses. Vibration is
        controlled with a single method: <Code>Vibration.vibrate()</Code>.
      </AppText>,
      <AppText>
        The vibration is asynchronous so this method will return immediately. There
        will be no effect on devices that do not support vibration.
      </AppText>
    ]}
    sections={sections}
    title="Vibration"
    url="apis/Vibration"
  />
);
