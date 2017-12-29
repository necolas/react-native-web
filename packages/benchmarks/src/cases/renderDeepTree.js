import createRenderBenchmark from '../createRenderBenchmark';
import NestedTree from './NestedTree';
import React from 'react';

const renderDeepTree = (label, components) =>
  createRenderBenchmark({
    name: `[${label}] Deep tree`,
    runs: 20,
    getElement() {
      return <NestedTree breadth={3} components={components} depth={6} id={0} wrap={1} />;
    }
  });

export default renderDeepTree;
