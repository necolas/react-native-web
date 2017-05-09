import { Component } from 'react';
import { bool, number, func , element } from 'prop-types';
import { unstable_renderSubtreeIntoContainer , unmountComponentAtNode } from 'react-dom';

class RenderToTopLayer extends Component {
  static propTypes = {
    children: element.isRequired,
    closeTimeout: number,
    onShow: func,
    showTimeout: number,
    visible: bool,
  }

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
    if (this.closeHandler) {
      clearTimeout(this.closeHandler);
    }
  }

  getLayer() {
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }

    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  renderLayer() {
    if (!this.layer) {
      this.layer = document.createElement('div');
      document.body.appendChild(this.layer);
    }
    const { visible =true , children } = this.props;

    if (visible) {
      this.layer.style.display = 'flex';
      this.showRequest();
    } else {
      this.closeRequest();
    }
    const layerElement = children;
    this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
  }

  closeCallback() {
    if (this.layer) {
      this.layer.style.display = 'none';
    }
    this.closeHandler = null;
  }

  closeRequest() {
    if (this.closeHandler)
      return;
    this.closeHandler = setTimeout(() => this.closeCallback(), this.props.closeTimeout || 0);
  }

  showCallback() {
    if (this.props.onShow) {
      this.props.onShow();
    }
    this.showHandler = null;
  }

  showRequest() {
    if (this.showHandler) {
      return;
    }
    this.showHandler = setTimeout(() => this.showCallback(), this.props.showTimeout || 0);
  }

  render() {
    return null;
  }
}

export default RenderToTopLayer;
