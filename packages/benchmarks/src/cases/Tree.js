import { Component } from 'react';

import { BenchmarkType } from '../app/Benchmark';

class Tree extends Component {
  static displayName = 'Tree';

  static benchmarkType = BenchmarkType.MOUNT;

  render() {
    const { breadth, components, depth, id, wrap } = this.props;
    const { Box } = components;

    let result = (
      <Box color={id % 3} layout={depth % 2 === 0 ? 'column' : 'row'} outer>
        {depth === 0 && <Box color={(id % 3) + 3} fixed />}
        {depth !== 0 &&
          Array.from({ length: breadth }).map((el, i) => (
            <Tree
              breadth={breadth}
              components={components}
              depth={depth - 1}
              id={i}
              key={i} // oxlint-disable-line react/no-array-index-key
              wrap={wrap}
            />
          ))}
      </Box>
    );
    for (let i = 0; i < wrap; i++) {
      result = <Box>{result}</Box>;
    }
    return result;
  }
}

export default Tree;
