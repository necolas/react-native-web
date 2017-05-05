import Animated from '../../apis/Animated';
import Dimensions from '../../apis/Dimensions';
import StyleSheet from '../../apis/StyleSheet';
import View from '../View';
import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ModalPropTypes from './ModalPropTypes';
import RenderToTopLayer from './RenderToTopLayout';

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
  >
  </style>;


class Modal extends Component {
  static displayName = 'Modal';

  static propTypes = ModalProptypes;

  static defaultProps = {
    animationType: 'none',
    visible: true,
  };

  render() {
    const { animationType, transparent, visible } = this.props;
    return (<RenderToTopLayer transparent={transparent}>
      <StyleComponent/>
      <CSSTransitionGroup
        transitionName={ animationType }
        transitionEnter = { animationType!="none" }
        transitionLeave = { animationType!="none" }
      >
        {visible && ...this.props.children}
        </CSSTransitionGroup>
    </RenderToTopLayer>)
  }
}

export default Modal;
