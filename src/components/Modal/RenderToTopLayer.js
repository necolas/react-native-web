import {Component} from 'react';
import PropTypes from 'prop-types';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';

// import Dom from '../utils/dom';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
class RenderToLayer extends Component {

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

/*  onClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.props.componentClickAway) {
      return;
    }

    if (!this.props.open) {
      return;
    }

    const el = this.layer;
    if (event.target !== el && event.target === window ||
      (document.documentElement.contains(event.target))) {
      this.props.componentClickAway(event);
    }
  };*/

  getLayer() {
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }

      this.layer.style.position = 'relative';
      this.layer.removeEventListener('touchstart', this.onClickAway);
      this.layer.removeEventListener('click', this.onClickAway);
    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  /**
   * By calling this method in componentDidMount() and
   * componentDidUpdate(), you're effectively creating a "wormhole" that
   * funnels React's hierarchical updates through to a DOM node on an
   * entirely different part of the page.
   */
  renderLayer() {
      if (!this.layer) {
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);

          this.layer.addEventListener('touchstart', this.onClickAway);
          this.layer.addEventListener('click', this.onClickAway);
          this.layer.style.display='flex';
          this.layer.style.position = 'fixed';
          this.layer.style.top = 0;
          this.layer.style.bottom = 0;
          this.layer.style.left = 0;
          this.layer.style.right = 0;
      }
      console.log('ddd');
      const layerElement = this.props.children;
      this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
  }

  render() {
    return null;
  }
}

export default RenderToLayer;
