
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ModalPropTypes from './ModalPropTypes';
import RenderToTopLayer from './RenderToTopLayer';
import View from '../View';
import StyleSheet from '../../apis/StyleSheet';

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
    const contentStyles = [ styles.modalConent ];
    contentStyles.push(transparent?styles.transparent:styles.noTransparent);
    return (
      <RenderToTopLayer
        closeTimeout={animationType === 'none' ? 0 : 300}
        onShow={onShow}
        showTimeout={animationType === 'none' ? 0 : 500}
        transparent={transparent}
        visible={visible}
      >
        <View>
          <StyleComponent />
          <CSSTransitionGroup component="div"
            transitionEnter={animationType !== 'none'}
            transitionEnterTimeout={500}
            transitionLeave={animationType !== 'none'}
            transitionLeaveTimeout={300}
            transitionName={animationType}
          >
            {visible && React.Children.map(this.props.children, (child) => {
              return <View style={contentStyles}>{child}</View>;
            })}
          </CSSTransitionGroup>
        </View>
      </RenderToTopLayer>)
  }
}

const styles = StyleSheet.create({
  modalConent: {
    flexDirection: 'column', 
    display: 'flex', 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    bottom: 0, 
    right: 0
  },
  transparent:{
    backgroundColor:'transparent'
  },
  noTransparent:{
    backgroundColor:'white'
  }
});

export default Modal;
