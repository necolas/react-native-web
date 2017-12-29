/**
 * @flow
 */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const VibrationScreen = () => (
  <UIExplorer title="Vibration" url="2-apis/Vibration">
    <Description>
      <AppText>
        Vibration is described as a pattern of on-off pulses, which may be of varying lengths. The
        pattern may consist of either a single integer, describing the number of milliseconds to
        vibrate, or an array of integers describing a pattern of vibrations and pauses. Vibration is
        controlled with a single method: <Code>Vibration.vibrate()</Code>.
      </AppText>
      <AppText>
        The vibration is asynchronous so this method will return immediately. There will be no
        effect on devices that do not support vibration.
      </AppText>
    </Description>

    <Section title="Methods">
      <DocItem description="Stop the vibration" name="static cancel" typeInfo="() => void" />

      <DocItem
        description="Start the vibration pattern"
        name="static vibrate"
        typeInfo="(pattern) => void"
      />
    </Section>

    <Section title="Examples">
      <DocItem
        description="Vibrate once for 200ms"
        example={{
          code: `Vibration.vibrate(200);
Vibration.vibrate([200]);`
        }}
      />

      <DocItem
        description="Vibrate for 200ms, pause for 100ms, vibrate for 200ms:"
        example={{
          code: 'Vibration.vibrate([200, 100, 200]);'
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Vibration', VibrationScreen);
