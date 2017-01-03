import createDeepTree from './benchmarks/deepTree/createDeepTree';
import deepTree from './benchmarks/deepTree';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactNative from 'react-native';

const node = document.querySelector('.root');
const DeepTree = createDeepTree(ReactNative);

Promise.resolve()
  .then(deepTree({ wrap: 4, depth: 3, breadth: 10, runs: 10, registerStyles: false }, node))
  .then(deepTree({ wrap: 1, depth: 5, breadth: 3, runs: 20, registerStyles: false }, node))
  .then(deepTree({ wrap: 4, depth: 3, breadth: 10, runs: 10 }, node))
  .then(deepTree({ wrap: 1, depth: 5, breadth: 3, runs: 20 }, node))
  .then(() => ReactDOM.render(<DeepTree breadth={3} depth={5} id={0} wrap={1} />, node));

