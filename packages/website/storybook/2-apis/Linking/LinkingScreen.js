/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import OpenURL from './examples/OpenURL';
import React from 'react';
import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const LinkingScreen = () => (
  <UIExplorer title="Linking" url="2-apis/Linking">
    <Description>
      Linking gives you a general interface for securely opening external URLs from JavaScript. As
      an alternative to the Linking API, &lt;Text&gt; elements may be appended with the "href" and
      "target" attributes to resemble web hyperlinks.
    </Description>

    <Section title="Methods">
      <DocItem name="canOpenURL" typeInfo="(url) => Promise<true>" />

      <DocItem name="getInitialURL" typeInfo="() => Promise<string>" />

      <DocItem
        name="openURL"
        typeInfo="(url: string, target: '_blank' | '_self', noopener?: 'noopener') => Promise<>"
        description="Try to open the given url in a secure fashion. The method returns a Promise object. If the url opens, the promise is resolved. If not, the promise is rejected. By default, all links are opened in an external window or tab. To open a link in the same window, include the target '_self'. To disable the window.opener object in the new window, include the 'noopener' parameter."
        example={{
          render: () => <OpenURL />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Linking', LinkingScreen);
