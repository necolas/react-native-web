import benchmark from './benchmark';
import ReactDOM from 'react-dom';

const node = document.querySelector('.root');

const createRenderBenchmark = ({ description, getElement, name, runs }) => () => {
  const setup = () => {};
  const teardown = () => {
    ReactDOM.unmountComponentAtNode(node);
  };

  return benchmark({
    name,
    description,
    runs,
    setup,
    teardown,
    task: () => {
      ReactDOM.render(getElement(), node);
    }
  });
};

export default createRenderBenchmark;
