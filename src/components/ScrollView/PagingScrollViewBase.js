import React, {Component} from 'react';
import View from '../View';

const normalizeScrollEvent = (e, xOffset) => ({
    nativeEvent: {
        contentOffset: {
            get x() {
                return xOffset;
            },
            get y() {
                return 0;
            }
        },
        contentSize: {
            get height() {
                return e.clientHeight;
            },
            get width() {
                return e.clientWidth;
            }
        },
        layoutMeasurement: {
            get height() {
                return e.offsetHeight;
            },
            get width() {
                return e.offsetWidth;
            }
        }
    },
    timeStamp: Date.now()
});
export default class PagingScrollViewBase extends Component {
    constructor(props) {
        super(props);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this.totalOffset = 0;
        this.startPos = 0;
        this.currentSelPosition = 0;
        this.scrollItemCount = 0;
    }

    componentDidMount() {
        this.scrollItemCount = Math.ceil(this._getContentWidth() / this._getParentWidth());
        this.maxPositiveTransform = this._getContentWidth() - this._getParentWidth();
        this.pixelThreshold = this._getParentWidth() / 3;
    }

    componentDidUpdate() {
        this.scrollItemCount = Math.ceil(this._getContentWidth() / this._getParentWidth());
        this.maxPositiveTransform = this._getContentWidth() - this._getParentWidth();
        this.pixelThreshold = this._getParentWidth() / 3;
    }

    _getContentWidth() {
        return this._contentRef.children[0].children[0].clientWidth;
    }

    _getParentWidth() {
        return this._parentRef.clientWidth;
    }

    _getCurrentTimeInSec() {
        return (new Date().getTime()) / 1000;
    }

    _onTouchMove(e: Object) {
        this.offset = this.startPos - e.touches[0].pageX;
        var newOffset = this.totalOffset + this.offset;
        if (newOffset < 0) {
            this.offset = 0;
            this.totalOffset = newOffset = 0;
        }
        else if (newOffset > this.maxPositiveTransform) {
            this.offset = 0;
            this.totalOffset = newOffset = this.maxPositiveTransform;
        }
        this._contentRef.style.transform = 'translate(' + -newOffset + 'px,0px)'
        if (this.props.onScroll) {
            this.props.onScroll(normalizeScrollEvent(this._contentRef, newOffset));
        }
    }

    _onTouchStart(e: Object) {
        this.startPos = e.touches[0].pageX;
        this.animationStartTS = this._getCurrentTimeInSec();
    }

    _onTouchEnd(e: Object) {
        var totalPixelsCovered = this.offset;
        this.totalOffset += this.offset;
        var moveVelocity = totalPixelsCovered / (this._getCurrentTimeInSec() - this.animationStartTS);
        if (moveVelocity < -this.pixelThreshold) {
            this.currentSelPosition = Math.max(0, this.currentSelPosition - 1);
        } else if (moveVelocity > this.pixelThreshold) {
            this.currentSelPosition = Math.min(this.scrollItemCount - 1, this.currentSelPosition + 1);
        }
        else {
            this.currentSelPosition = this._getPositionMetaForX(this.totalOffset);
        }
        this._scrollToCurrentPosition();
    }

    _getPositionMetaForX(x) {
        var mod = x / (this._getParentWidth());
        return Math.round(mod);
    }

    _scrollToCurrentPosition() {
        var correctOffsetForPostion = this._getParentWidth() * this.currentSelPosition;
        this.totalOffset = correctOffsetForPostion;
        this.offset = 0;
        this._contentRef.style.cssText = "transition: transform 0.20s ease-out; transform: translate(" + -correctOffsetForPostion + "px,0px)";
        if (this.props.onScroll) {
            this.props.onScroll(normalizeScrollEvent(this._contentRef, correctOffsetForPostion));
        }
    }

    _setContentRef = (ref) => {
        this._contentRef = ref;
    }
    _setParentRef = (ref) => {
        this._parentRef = ref;
    }

    render() {
        const {
            scrollEnabled,
            style,
            /* eslint-disable */
            onMomentumScrollBegin,
            onMomentumScrollEnd,
            onScrollBeginDrag,
            onScrollEndDrag,
            removeClippedSubviews,
            scrollEventThrottle,
            showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator,
            /* eslint-enable */
            ...other
        } = this.props;
        return (
            <View domRef={this._setParentRef} style={{flex: 1, overflow: 'hidden'}} onTouchStart={this._onTouchStart}
                  onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd}>
                <View domRef={this._setContentRef} style={{flex: 1}} {...other}/>
            </View>);
    }
}
