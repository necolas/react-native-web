import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ModalPropTypes from './ModalPropTypes';
import RenderToTopLayer from './RenderToTopLayer';
import View from '../View';

const StyleComponent = () =>
  <style
    dangerouslySetInnerHTML={{
      __html: `
        .slide-enter {
          transform: translate(100%);
        }

        .slide-enter.slide-enter-active {
          transform: translate(0%);
          transition: transform 500ms ease-in-out;
        }

        .slide-leave {
          transform: translate(0%);
        }

        .slide-leave.slide-leave-active {
          transform: translate(-100%);
          transition: transform 300ms ease-in-out;
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

        .fade-leave.fade-leave-active {
          opacity: 0.01;
          transition: opacity 300ms ease-in;
        }
      `
    }}
  />;


class Modal extends Component {
  static displayName = 'Modal';

  static propTypes = ModalPropTypes;

  static defaultProps = {
    animationType: 'none',
    visible: true,
  }

  render() {
    const { animationType, transparent, visible, onShow } = this.props;
    return (
      <RenderToTopLayer
        transparent={transparent}
        closeTimeout={animationType === 'none' ? 0 : 300}
        showTimeout={animationType === 'none' ? 0 : 500}
        visible={visible}
        onShow={onShow}
      >
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <StyleComponent />
          <CSSTransitionGroup component="div" style={{ display: 'flex', flex: 1 }}
            transitionEnter={animationType != 'none'}
            transitionEnterTimeout={500}
            transitionLeave={animationType != 'none'}
            transitionLeaveTimeout={300}
            transitionName={animationType}
          >
            {visible && this.props.children}
          </CSSTransitionGroup>
        </View>
      </RenderToTopLayer>)
  }
}

export default Modal;
