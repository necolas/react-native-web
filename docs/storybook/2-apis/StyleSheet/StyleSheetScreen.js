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

const StyleSheetScreen = () => (
  <UIExplorer title="StyleSheet" url="2-apis/StyleSheet">
    <Description>
      The StyleSheet abstraction converts predefined styles to (vendor-prefixed) CSS without
      requiring a compile-time step. Styles that cannot be resolved outside of the render loop
      (e.g., dynamic positioning) are usually applied as inline styles.
    </Description>

    <Section title="Methods">
      <DocItem
        description="Each key of the object passed to `create` must define a style object. The returned object replaces style objects with IDs"
        example={{
          code: `const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  }
})`
        }}
        name="create"
        typeInfo="(obj: {[key: string]: any})"
      />

      <DocItem
        description="Lookup a style object by ID or flatten an array of styles into a single style object."
        example={{
          code: `StyleSheet.flatten(styles.listItem);
StyleSheet.flatten([styles.listItem, styles.selectedListItem]);`
        }}
        name="flatten"
        typeInfo="()"
      />

      <DocItem
        description={
          <AppText>
            Returns an array of stylesheets of the form <Code>{'{ id, textContent }'}</Code>. Useful
            for compile-time or server-side rendering if you are not using AppRegistry.
          </AppText>
        }
        label="web"
        name="getStyleSheets"
        typeInfo="() => Array"
      />
    </Section>

    <Section title="Properties">
      <DocItem
        description="A very common pattern is to create overlays with position absolute and zero positioning, so `absoluteFill` can be used for convenience and to reduce duplication of these repeated styles."
        example={{
          code: '<View style={StyleSheet.absoluteFill} />'
        }}
        name="absoluteFill"
        typeInfo="number"
      />

      <DocItem
        description="Sometimes you may want `absoluteFill` but with a couple tweaks - `absoluteFillObject` can be used to create a customized entry in a `StyleSheet`"
        example={{
          code: `const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    top: 10
  }
})`
        }}
        name="absoluteFillObject"
        typeInfo="object"
      />

      <DocItem name="hairlineWidth" typeInfo="number" />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('StyleSheet', StyleSheetScreen);
