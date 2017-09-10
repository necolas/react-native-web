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

const PixelRatioScreen = () => (
  <UIExplorer title="PixelRatio" url="2-apis/PixelRatio">
    <Description>PixelRatio class gives access to the device pixel density.</Description>
    <Section title="Methods">
      <DocItem
        description="Returns the device pixel density"
        name="static get"
        typeInfo="() => number"
      />

      <DocItem
        description="On web this returns the device pixel ratio"
        name="static getFontScale"
        typeInfo="() => number"
      />

      <DocItem
        description="Converts a layout size (dp) to pixel size (px). Guaranteed to return an integer number."
        example={{
          code: `const image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />`
        }}
        name="static getPixelSizeForLayoutSize"
        typeInfo="(layoutSize: number) => number"
      />

      <DocItem
        description={
          <AppText>
            Rounds a layout size (dp) to the nearest layout size that corresponds to an integer
            number of pixels. For example, on a device with a PixelRatio of <Code>3</Code>,{' '}
            <Code>PixelRatio.roundToNearestPixel(8.4) = 8.33</Code>, which corresponds to exactly{' '}
            <Code>(8.33 * 3) = 25</Code> pixels.
          </AppText>
        }
        name="static roundToNearestPixel"
        typeInfo="(layoutSize: number) => number"
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('PixelRatio', PixelRatioScreen);
