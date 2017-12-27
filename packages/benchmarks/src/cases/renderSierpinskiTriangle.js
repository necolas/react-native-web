import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SierpinskiTriangle from './SierpinskiTriangle';
import { log } from '../benchmark';

const node = document.querySelector('.root');

let runs = 20;

class Speedometer extends React.Component {
  /* necessary for reactxp to work without errors */
  static childContextTypes = {
    focusManager: PropTypes.object
  };
  getChildContext() {
    return {
      focusManager: {
        addFocusableComponent() {},
        removeFocusableComponent() {},
        restrictFocusWithin() {},
        removeFocusRestriction() {},
        limitFocusWithin() {},
        removeFocusLimitation() {}
      }
    };
  }

  static propTypes = {
    Dot: PropTypes.node.isRequired,
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    onComplete: PropTypes.node.isRequired
  };

  state = { renderCount: -1 };

  async componentDidMount() {
    const durations = [];

    while ((runs -= 1)) {
      const prev = window.performance.now();
      await new Promise(resolve => {
        this.raf = window.requestAnimationFrame(() => {
          this.setState({ renderCount: this.state.renderCount + 1 }, () => {
            const now = window.performance.now();
            durations.push(now - prev);
            resolve();
          });
        });
      });
    }

    const { description, name } = this.props;
    log(name, description, durations);

    runs = 20;
    this.props.onComplete();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.raf);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <SierpinskiTriangle
          Dot={this.props.Dot}
          renderCount={this.state.renderCount}
          s={1000}
          x={0}
          y={0}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'absolute',
    transformOrigin: '0 0',
    left: '50%',
    top: '50%',
    width: '10px',
    height: '10px',
    backgroundColor: '#eee',
    transform: 'scale(0.33)'
  }
};

const renderSierpinskiTriangle = (name, { Dot }) => () => {
  return new Promise(resolve => {
    /* eslint-disable react/jsx-no-bind */
    ReactDOM.render(
      <Speedometer
        Dot={Dot}
        description="Dynamic styles"
        name={`[${name}] Triangle`}
        onComplete={() => {
          ReactDOM.unmountComponentAtNode(node);
          resolve();
        }}
      />,
      node
    );
    /* eslint-enable react/jsx-no-bind */
  });
};

export default renderSierpinskiTriangle;
