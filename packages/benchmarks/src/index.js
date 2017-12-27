import aphrodite from './implementations/aphrodite';
import cssModules from './implementations/css-modules';
import emotion from './implementations/emotion';
import jss from './implementations/jss';
import glamor from './implementations/glamor';
import inlineStyles from './implementations/inline-styles';
import radium from './implementations/radium';
import reactNativeWeb from './implementations/react-native-web';
import reactxp from './implementations/reactxp';
import styledComponents from './implementations/styled-components';
import styletron from './implementations/styletron';

import renderDeepTree from './cases/renderDeepTree';
import renderSierpinskiTriangle from './cases/renderSierpinskiTriangle';
// import renderTweet from './cases/renderTweet';
import renderWideTree from './cases/renderWideTree';

const testMatrix = {
  'inline-styles': [
    () => renderDeepTree('inline-styles', inlineStyles),
    () => renderWideTree('inline-styles', inlineStyles),
    () => renderSierpinskiTriangle('inline-styles', inlineStyles)
  ],
  'css-modules': [
    () => renderDeepTree('css-modules', cssModules),
    () => renderWideTree('css-modules', cssModules)
  ],
  'react-native-web': [
    () => renderDeepTree('react-native-web', reactNativeWeb),
    () => renderWideTree('react-native-web', reactNativeWeb),
    () => renderSierpinskiTriangle('react-native-web', reactNativeWeb)
    // () => renderTweet('react-native-web', reactNativeWeb)
  ],

  aphrodite: [
    () => renderDeepTree('aphrodite', aphrodite),
    () => renderWideTree('aphrodite', aphrodite)
  ],
  emotion: [
    () => renderDeepTree('emotion', emotion),
    () => renderWideTree('emotion', emotion),
    () => renderSierpinskiTriangle('emotion', emotion)
  ],
  glamor: [
    () => renderDeepTree('glamor', glamor),
    () => renderWideTree('glamor', glamor)
    // disabled: glamor starts to lock up the browser
    // () => renderSierpinskiTriangle('glamor', glamor)
  ],
  jss: [() => renderDeepTree('jss', jss), () => renderWideTree('jss', jss)],
  radium: [
    () => renderDeepTree('radium', radium),
    () => renderWideTree('radium', radium),
    () => renderSierpinskiTriangle('radium', radium)
  ],
  reactxp: [
    () => renderDeepTree('reactxp', reactxp),
    () => renderWideTree('reactxp', reactxp),
    () => renderSierpinskiTriangle('reactxp', reactxp)
  ],
  'styled-components': [
    () => renderDeepTree('styled-components', styledComponents),
    () => renderWideTree('styled-components', styledComponents),
    () => renderSierpinskiTriangle('styled-components', styledComponents)
  ],
  styletron: [
    () => renderDeepTree('styletron', styletron),
    () => renderWideTree('styletron', styletron),
    () => renderSierpinskiTriangle('styletron', styletron)
  ]
};

const allTests = Object.keys(testMatrix).reduce((acc, curr) => {
  testMatrix[curr].forEach(test => {
    acc.push(test);
  });
  return acc;
}, []);

const tests = [];

if (window.location.search) {
  window.location.search
    .slice(1)
    .split(',')
    .forEach(implementation => {
      if (Array.isArray(testMatrix[implementation])) {
        tests.push(...testMatrix[implementation]);
      } else {
        throw new Error(`Benchmark for ${implementation} not found`);
      }
    });
} else {
  tests.push(...allTests);
}

tests.push(() => () => Promise.resolve(console.log('Done')));

tests.reduce((promise, test) => promise.then(test()), Promise.resolve());
