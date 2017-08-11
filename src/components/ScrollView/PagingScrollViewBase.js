import React, {Component} from 'react';
import View from '../View';
import Animated from '../../apis/Animated';
import Easing from 'animated/lib/Easing';

export default class PagingScrollViewBase extends Component {
    static propTypes = {
        onScroll: React.PropTypes.func
    };
    constructor(props) {
        super(props);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._totalOffset = 0;
        this._startPos = 0;
        this._currentSelPosition = 0;
        this._scrollItemCount = 0;
        this._contentWidth = 0;
        this._contentHeight = 0;
        this._parentWidth = 0;
        this._parentHeight = 0;
        this._currentOffset = new Animated.Value(0);
    }

    componentWillMount() {
        this._currentOffset.addListener(this._offsetChange);
    }

    componentWillUnmount() {
        this._currentOffset.removeListener(this._offsetChange);
    }

    _updatePositions() {
        this._scrollItemCount = Math.ceil(this._contentWidth / this._parentWidth);
        this.maxPositiveTransform = this._contentWidth - this._parentWidth;
        this.pixelThreshold = this._parentWidth / 3;
    }

    _getCurrentTimeInSec() {
        return new Date().getTime() / 1000;
    }

    _onTouchMove(e: Object) {
        this.offset = this._startPos - e.touches[0].pageX;
        let newOffset = this._totalOffset + this.offset;
        if (newOffset < 0) {
            this.offset = 0;
            this._totalOffset = newOffset = 0;
        } else if (newOffset > this.maxPositiveTransform) {
            this.offset = 0;
            this._totalOffset = newOffset = this.maxPositiveTransform;
        }
        this._currentOffset.setValue(-newOffset);
    }

    _onTouchStart(e: Object) {
        this._startPos = e.touches[0].pageX;
        this.animationStartTS = this._getCurrentTimeInSec();
    }

    _onTouchEnd(e: Object) {
        const totalPixelsCovered = this.offset;
        this._totalOffset += this.offset;
        const moveVelocity = totalPixelsCovered / (this._getCurrentTimeInSec() - this.animationStartTS);
        if (moveVelocity < -this.pixelThreshold) {
            this._currentSelPosition = Math.max(0, this._currentSelPosition - 1);
        } else if (moveVelocity > this.pixelThreshold) {
            this._currentSelPosition = Math.min(this._scrollItemCount - 1, this._currentSelPosition + 1);
        } else {
            this._currentSelPosition = this._getPositionMetaForX(this._totalOffset);
        }
        this._scrollToCurrentPosition();
    }

    _getPositionMetaForX(x) {
        return Math.round(x / this._parentWidth);
    }

    _scrollToCurrentPosition() {
        const correctOffsetForPosition = this._parentWidth * this._currentSelPosition;
        this._totalOffset = correctOffsetForPosition;
        this.offset = 0;
        Animated.timing(this._currentOffset, {toValue: -correctOffsetForPosition, easing: Easing.easeOut}).start();
    }

    _onContentLayout = (e) => {
        this._contentWidth = e.nativeEvent.layout.width;
        this._contentHeight = e.nativeEvent.layout.height;
        this._updatePositions();
    };

    _onParentLayout = (e) => {
        this._parentWidth = e.nativeEvent.layout.width;
        this._parentHeight = e.nativeEvent.layout.height;
        this._updatePositions();
    };

    _offsetChange = (e) => {
        if (this.props.onScroll) {
            this.props.onScroll(this._normalizeScrollEvent(-e.value));
        }
    }

    _normalizeScrollEvent = (xOffset) => ({
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
                    return this._contentHeight;
                },
                get width() {
                    return this._contentWidth;
                }
            },
            layoutMeasurement: {
                get height() {
                    return this._parentHeight;
                },
                get width() {
                    return this._parentWidth;
                }
            }
        },
        timeStamp: Date.now()
    });

    render() {
        const {
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
            <View
                onLayout={this._onParentLayout}
                onTouchEnd={this._onTouchEnd}
                onTouchMove={this._onTouchMove}
                onTouchStart={this._onTouchStart}
                style={{flex: 1, overflow: 'hidden'}}
            >
                <View onLayout={this._onContentLayout} style={{flex: 1, transform:[{translateX: this._currentOffset}]}} {...other} />
            </View>
        );
    }
}
