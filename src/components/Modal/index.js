import React, { Component } from 'react';
import View from '../View';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import RenderToTopLayer from './RenderToTopLayer';

const StyleComponent = ()=>
  <style
    dangerouslySetInnerHTML={{
      __html:`
        .slide-enter {
          opacity: 0.01;
        }

        .slide-enter.slide-enter-active {
          opacity: 1;
          transition: opacity 500ms ease-in;
        }

        .slide-leave {
          opacity: 1;
        }

        .slide-leave.slide-leave-active {
          opacity: 0.01;
          transition: opacity 300ms ease-in;
        }

        .fade-enter {
          opacity: 0.01;
        }

        .fade-enter.fade-enter-active {
          opacity: 1;
          transition: opacity 500ms ease-in;
        }

        .fade-leave {
          opacity: 1;
        }

        .fade-leave.slide-fade-active {
          opacity: 0.01;
          transition: opacity 300ms ease-in;
        }
      `
    }}
   />;


class Modal extends Component {
  static displayName = 'Modal';

  // static propTypes = ModalProptypes;

  static defaultProps = {
    animationType: 'none',
    visible: true,
  };

  render() {
    const { animationType, transparent, visible } = this.props;
    console.log(this.props);
    return (
      <RenderToTopLayer
        transparent={transparent}
      >
      <CSSTransitionGroup component="div" style={{display:'flex',flex:1}}
        transitionEnter = { animationType != 'none' }
        transitionLeave = { animationType != 'none' }
        transitionName={ animationType }
      >
        {visible && this.props.children}
        </CSSTransitionGroup>
    </RenderToTopLayer>)
  }
}


{/*<RenderToLayer render={this.renderLayer} open={true} useLayerForClickAway={false} />*/}


export default Modal;
