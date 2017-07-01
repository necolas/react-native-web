import { setOptions } from '@kadira/storybook-addon-options';
import centered from './decorator-centered';
import { configure, addDecorator } from '@kadira/storybook';

const context = require.context('../', true, /Docs\.js$/);

addDecorator(centered);

setOptions({
  name: 'React Native Web',
  url: 'https://necolas.github.io/react-native-web',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false
});

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);
