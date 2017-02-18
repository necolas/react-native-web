import benchmark from '../../benchmark';
import createDeepTree from './createDeepTree';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactNative from 'react-native';

const deepTreeBenchmark = (config, node) => () => {
  const { breadth, depth, leafComponent = 'View', registerStyles = true, runs, wrap } = config;

  // React Native for Web implementation of the tree
  const DeepTree = createDeepTree(ReactNative, { registerStyles });

  const setup = () => {};
  const teardown = () => ReactDOM.unmountComponentAtNode(node);

  let name = `DeepTree: ${leafComponent}`;
  if (!registerStyles) {
    name += ' (unregistered styles)';
  }

  return benchmark({
    name,
    description: `depth=${depth}, breadth=${breadth}, wrap=${wrap}`,
    runs,
    setup,
    teardown,
    task: () => ReactDOM.render(<DeepTree breadth={breadth} depth={depth} id={0} wrap={wrap} />, node)
  });
};

module.exports = deepTreeBenchmark;
