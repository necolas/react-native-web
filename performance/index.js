import cssModules from './components/css-modules';
import glamor from './components/glamor';
import platform from './components/platform';
import reactNative from './components/react-native-web';
import styledComponents from './components/styled-components';

import renderDeepTree from './tests/renderDeepTree';
import renderTweet from './tests/renderTweet';
import renderWideTree from './tests/renderWideTree';

const tests = [
  // tweet
  () => renderTweet('react-native-web', reactNative),
  // deep tree
  () => renderDeepTree('platform', platform),
  () => renderDeepTree('css-modules', cssModules),
  () => renderDeepTree('react-native-web', reactNative),
  () => renderDeepTree('styled-components', styledComponents),
  () => renderDeepTree('glamor', glamor),
  // wide tree
  () => renderWideTree('platform', platform),
  () => renderWideTree('css-modules', cssModules),
  () => renderWideTree('react-native-web', reactNative),
  () => renderWideTree('styled-components', styledComponents),
  () => renderWideTree('glamor', glamor)
];

// run benchmarks
tests.reduce((promise, test) => promise.then(test()), Promise.resolve());
