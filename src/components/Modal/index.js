/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactModal
 */
'use strict';

import React, {PropTypes, Component} from 'react';
import StyleSheet from '../../apis/StyleSheet';
import DeviceEventEmitter from '../../apis/DeviceEventEmitter';
import View from '../View';
import TouchableHighlight from '../Touchable/TouchableHighlight';
const ModalEvent = {
    contentChange: "modalWeb_change_content",
}

class Modal extends Component {
    state = {
        content: null,
        transparent: true,
        onRequestClose: null,
        maskClosable: false,
    }

    setNativeProps(nextProps, nextState) {
        const {main, visible, children, transparent, onRequestClose} = nextProps;
        if (!main) {
            DeviceEventEmitter.emit(ModalEvent.contentChange, {visible, children, transparent, onRequestClose})
        }
    }

    constructor(props) {
        super(props);
    }

    lastProps = {}

    componentDidMount() {
        const {main, visible, children, transparent, onRequestClose} = this.props;
        let self = this;
        if (main) {
            DeviceEventEmitter.addListener(ModalEvent.contentChange, ({visible, children, transparent, onRequestClose}) => {
                this.setState({
                    content: visible ? children : null,
                    transparent,
                    onRequestClose,
                });
            })
        }

        if (!main && visible && children) {
            DeviceEventEmitter.emit(ModalEvent.contentChange, {visible, children, transparent, onRequestClose})
        }
        this.lastProps = this.props;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {main, visible, children, transparent, onRequestClose} = nextProps;
        if (!main) {
            DeviceEventEmitter.emit(ModalEvent.contentChange, {visible, children, transparent, onRequestClose})
        }
        return true;
    }

    close() {
        if (this.state.onRequestClose) {
            this.state.onRequestClose();
        }

        this.setState({
            content: null
        });
    }

    render() {
        const {main} = this.props;
        const {content, transparent, maskClosable} = this.state;
        return (main && content ?
            <TouchableHighlight
                underlayColor={transparent?"rgba(0,0,0,0)":"#000"}
                onPress={maskClosable?this.close.bind(this):null}
                style={[styles.modal,transparent?{backgroundColor:"rgba(0,0,0,0)"}:null]}>
                {content}
            </TouchableHighlight>
            : null);
    }
}

Modal.propTypes = {
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    onRequestClose: PropTypes.func,
    onShow: PropTypes.func,
    transparent: PropTypes.bool,
    visible: PropTypes.bool,
};

let styles = StyleSheet.create({
    modal: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: '#000',
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
    },
});

Modal.isReactNativeComponent = true;
module.exports = Modal;