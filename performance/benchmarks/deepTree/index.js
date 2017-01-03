import benchmark from '../../benchmark';
import createDeepTree from './createDeepTree';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactNative from 'react-native';

const deepTreeBenchmark = ({ breadth, depth, registerStyles = true, runs, wrap }, node) => () => {
  // React Native for Web implementation of the tree
  const DeepTree = createDeepTree(ReactNative, { registerStyles });

  const setup = () => {};
  const teardown = () => ReactDOM.unmountComponentAtNode(node);

  return benchmark({
    name: `DeepTree (${registerStyles ? 'registered' : 'unregistered'}) styles)`,
    description: `depth=${depth}, breadth=${breadth}, wrap=${wrap}`,
    runs,
    setup,
    teardown,
    task: () => ReactDOM.render(<DeepTree breadth={breadth} depth={depth} id={0} wrap={wrap} />, node)
  });
};

module.exports = deepTreeBenchmark;
