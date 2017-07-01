import aphrodite from './src/aphrodite';
import cssModules from './src/css-modules';
import glamor from './src/glamor';
import jss from './src/jss';
import reactNative from './src/react-native';
import reactNativeStyleSheet from './src/react-native-stylesheet';
import styledComponents from './src/styled-components';
import styledComponentsPrimitives from './src/styled-components-primitives';
import styletron from './src/styletron';
import xp from './src/reactxp';

import renderDeepTree from './tests/renderDeepTree';
import renderTweet from './tests/renderTweet';
import renderWideTree from './tests/renderWideTree';

const testAll = window.location.search === '?all';

const coreTests = [
  () => renderTweet('react-native-web', reactNative),

  () => renderDeepTree('css-modules', cssModules),
  () => renderWideTree('css-modules', cssModules),
  () => renderDeepTree('react-native-web/stylesheet', reactNativeStyleSheet),
  () => renderWideTree('react-native-web/stylesheet', reactNativeStyleSheet),
  () => renderDeepTree('react-native-web', reactNative),
  () => renderWideTree('react-native-web', reactNative)
];

/**
 * Optionally run tests using other libraries
 */
const extraTests = [
  () => renderDeepTree('styletron', styletron),
  () => renderWideTree('styletron', styletron),
  () => renderDeepTree('aphrodite', aphrodite),
  () => renderWideTree('aphrodite', aphrodite),
  () => renderDeepTree('glamor', glamor),
  () => renderWideTree('glamor', glamor),
  () => renderDeepTree('react-jss', jss),
  () => renderWideTree('react-jss', jss),
  () => renderDeepTree('reactxp', xp),
  () => renderWideTree('reactxp', xp),
  () => renderDeepTree('styled-components', styledComponents),
  () => renderWideTree('styled-components', styledComponents),
  () => renderDeepTree('styled-components/primitives', styledComponentsPrimitives),
  () => renderWideTree('styled-components/primitives', styledComponentsPrimitives)
];

const tests = testAll ? coreTests.concat(extraTests) : coreTests;

// run benchmarks
tests.reduce((promise, test) => promise.then(test()), Promise.resolve());
