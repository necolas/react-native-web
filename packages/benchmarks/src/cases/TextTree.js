import { BenchmarkType } from '../app/Benchmark';
import { number, object } from 'prop-types';
import React, { Component } from 'react';

class TextTree extends Component {
  static displayName = 'TextTree';

  static benchmarkType = BenchmarkType.MOUNT;

  static propTypes = {
    breadth: number.isRequired,
    components: object,
    depth: number.isRequired,
    id: number.isRequired,
    wrap: number.isRequired
  };

  render() {
    const { breadth, components, depth, id, wrap } = this.props;
    const { TextBox } = components;

    let result = (
      <TextBox children={'TextBox ${id % 3}'} color={id % 3} outer>
        {depth === 0 && <TextBox children={'Depth 0'} color={(id % 3) + 3} />}
        {depth !== 0 &&
          Array.from({ length: breadth }).map((el, i) => (
            <TextTree
              breadth={breadth}
              components={components}
              depth={depth - 1}
              id={i}
              key={i}
              wrap={wrap}
            />
          ))}
      </TextBox>
    );
    for (let i = 0; i < wrap; i++) {
      result = <TextBox>{result}</TextBox>;
    }
    return result;
  }
}

export default TextTree;
