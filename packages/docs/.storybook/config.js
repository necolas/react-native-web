import { create } from '@storybook/theming';

// import centered from './decorator-centered';
import { addParameters, configure, addDecorator } from '@storybook/react';

// Option defaults:
addParameters({
  options: {
    storySort: (a, b) => {
      const sectionA = a[1].id.split('-')[0];
      const sectionB = b[1].id.split('-')[0];

      return sectionB.localeCompare(sectionA);
    },
    theme: create({
      base: 'light',
      brandTitle: 'React Native for Web',
      brandUrl: 'https://necolas.github.io/react-native-web',
      // To control appearance:
      // brandImage: 'http://url.of/some.svg',
    }),
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\/|\./,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    panelPosition: 'bottom',
  },
});

// addDecorator(centered);

const context = require.context('../src', true, /\.stories\.(js|mdx)$/);

configure(context, module);
