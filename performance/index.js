import cssModules from './implementations/css-modules';
import glamor from './implementations/glamor';
import reactNative from './implementations/react-native-web';
import reactNativeLite from './implementations/react-native-web/lite';
import styledComponents from './implementations/styled-components';

import renderDeepTree from './tests/renderDeepTree';
import renderWideTree from './tests/renderWideTree';

const tests = [
  // deep tree
  () => renderDeepTree('css-modules', cssModules),
  () => renderDeepTree('react-native-web/lite', reactNativeLite),
  () => renderDeepTree('react-native-web', reactNative),
  () => renderDeepTree('styled-components', styledComponents),
  () => renderDeepTree('glamor', glamor),
  // wide tree
  () => renderWideTree('css-modules', cssModules),
  () => renderWideTree('react-native-web/lite', reactNativeLite),
  () => renderWideTree('react-native-web', reactNative),
  () => renderWideTree('styled-components', styledComponents),
  () => renderWideTree('glamor', glamor)
];

// run benchmarks
tests.reduce((promise, test) => promise.then(test()), Promise.resolve());
