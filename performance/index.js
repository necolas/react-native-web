import cssModules from './implementations/css-modules';
import glamor from './implementations/glamor';
import platform from './implementations/platform';
import reactNative from './implementations/react-native-web';
import styledComponents from './implementations/styled-components';

import renderDeepTree from './tests/renderDeepTree';
import renderWideTree from './tests/renderWideTree';

const tests = [
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
