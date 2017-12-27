import PropTypes from 'prop-types';
import React from 'react';
import { interpolatePurples, interpolateBuPu, interpolateRdPu } from 'd3-scale-chromatic';

const targetSize = 25;

class SierpinskiTriangle extends React.Component {
  static propTypes = {
    Dot: PropTypes.node,
    depth: PropTypes.number,
    renderCount: PropTypes.number,
    s: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    depth: 0,
    renderCount: 0
  };

  render() {
    const { x, y, depth, renderCount, Dot } = this.props;
    let { s } = this.props;

    if (s <= targetSize) {
      let fn;
      switch (depth) {
        case 1:
          fn = interpolatePurples;
          break;
        case 2:
          fn = interpolateBuPu;
          break;
        case 3:
        default:
          fn = interpolateRdPu;
      }

      return (
        <Dot
          color={fn(renderCount / 20)}
          size={targetSize}
          x={x - targetSize / 2}
          y={y - targetSize / 2}
        />
      );
    }

    s /= 2;

    return [
      <SierpinskiTriangle
        Dot={Dot}
        depth={1}
        key={1}
        renderCount={renderCount}
        s={s}
        x={x}
        y={y - s / 2}
      />,
      <SierpinskiTriangle
        Dot={Dot}
        depth={2}
        key={2}
        renderCount={renderCount}
        s={s}
        x={x - s}
        y={y + s / 2}
      />,
      <SierpinskiTriangle
        Dot={Dot}
        depth={3}
        key={3}
        renderCount={renderCount}
        s={s}
        x={x + s}
        y={y + s / 2}
      />
    ];
  }
}

export default SierpinskiTriangle;
