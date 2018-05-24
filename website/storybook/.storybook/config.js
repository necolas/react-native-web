import { setOptions } from '@storybook/addon-options';
import centered from './decorator-centered';
import { configure, addDecorator } from '@storybook/react';

const context = require.context('../', true, /Screen\.js$/);

addDecorator(centered);

setOptions({
  name: 'React Native Web',
  url: 'https://necolas.github.io/react-native-web',
  goFullScreen: false,
  addonPanelInRight: false,
  showSearchBox: false,
  showAddonPanel: false,
  showStoriesPanel: true
});

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);
