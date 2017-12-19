import aphrodite from './src/aphrodite';
import cssModules from './src/css-modules';
import emotion from './src/emotion';
import glamor from './src/glamor';
import jss from './src/jss';
import radium from './src/radium';
import reactNative from './src/react-native';
import styledComponents from './src/styled-components';
import styletron from './src/styletron';
import xp from './src/reactxp';

import renderDeepTree from './tests/renderDeepTree';
import renderTweet from './tests/renderTweet';
import renderWideTree from './tests/renderWideTree';

const testAll = window.location.search === '?all';
const testFastest = window.location.search === '?fastest';

const coreTests = [
  () => renderTweet('react-native-web', reactNative),

  () => renderDeepTree('css-modules', cssModules),
  () => renderWideTree('css-modules', cssModules),
  () => renderDeepTree('react-native-web', reactNative),
  () => renderWideTree('react-native-web', reactNative)
];

const fastestTests = [
  () => renderDeepTree('styletron', styletron),
  () => renderWideTree('styletron', styletron),
  () => renderDeepTree('aphrodite', aphrodite),
  () => renderWideTree('aphrodite', aphrodite),
];

/**
 * Optionally run tests using other libraries
 */
const restTests = [
  () => renderDeepTree('glamor', glamor),
  () => renderWideTree('glamor', glamor),
  () => renderDeepTree('react-jss', jss),
  () => renderWideTree('react-jss', jss),
  () => renderDeepTree('emotion', emotion),
  () => renderWideTree('emotion', emotion),
  () => renderDeepTree('styled-components', styledComponents),
  () => renderWideTree('styled-components', styledComponents),
  () => renderDeepTree('reactxp', xp),
  () => renderWideTree('reactxp', xp),
  () => renderDeepTree('radium', radium),
  () => renderWideTree('radium', radium),
];

const tests = [...coreTests];
if (testFastest) {
  tests.push(...fastestTests);
}
if (testAll) {
  tests.push(...fastestTests);
  tests.push(...restTests);
}

// run benchmarks
tests.reduce((promise, test) => promise.then(test()), Promise.resolve());
