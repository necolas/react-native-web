import { Component } from 'react';
import { bool, number, func } from 'prop-types';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';

class RenderToLayer extends Component {
  static propTypes = {
    closeTimeout: number,
    onShow: func,
    showTimeout: number,
    transparent: bool,
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
      this.layer.style.display = 'flex';
      this.layer.style.position = 'fixed';
      this.layer.style.top = 0;
      this.layer.style.bottom = 0;
      this.layer.style.left = 0;
      this.layer.style.right = 0;
    }
    if (this.props.transparent) {
      this.layer.style['background-color'] = 'transparent';
    } else {
      this.layer.style['background-color'] = 'white';
    }

    if (this.props.visible) {
      this.layer.style.display = 'flex';
      this.showRequest();
    } else {
      this.closeRequest();
    }
    const layerElement = this.props.children;
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

export default RenderToLayer;
