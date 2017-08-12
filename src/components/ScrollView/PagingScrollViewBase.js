import React, {Component} from 'react';
import View from '../View';
import Animated from '../../apis/Animated';
import Easing from 'animated/lib/Easing';

const normalizeScrollEvent = (parent, xOffset) => ({
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
                return parent._contentHeight;
            },
            get width() {
                return parent._contentWidth;
            }
        },
        layoutMeasurement: {
            get height() {
                return parent._parentHeight;
            },
            get width() {
                return parent._parentWidth;
            }
        }
    },
    timeStamp: Date.now()
});

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

    componentDidMount() {
        this._measureContent();
    }

    componentDidUpdate() {
        this._measureContent();
    }

    componentWillMount() {
        this._currentOffset.addListener(this._offsetChange);
    }

    componentWillUnmount() {
        this._currentOffset.removeListener(this._offsetChange);
    }

    //For some reason onLayout/measure callbacks are not working on the content view
    _measureContent() {
        this._contentWidth = this._contentRef.clientWidth;
        this._contentHeight = this._contentRef.clientHeight;
        this._updatePositions();
    }

    _updatePositions() {
        this._scrollItemCount = Math.ceil(this._contentWidth / this._parentWidth);
        this.maxPositiveTransform = this._contentWidth - this._parentWidth;
        this.pixelThreshold = this._parentWidth / 3;
    }

    scrollTo(y?: number | { x?: number, y?: number, animated?: boolean },
             x?: number,
             animated?: boolean) {

        if (typeof y === 'number') {
            console.warn(
                '`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.'
            );
        } else {
            ({x, y, animated} = y || {});
        }
        this._totalOffset = Math.min(this.maxPositiveTransform, x);
        this._currentSelPosition = this._getPositionMetaForX(this._totalOffset);
        this._scrollToCurrentPosition(animated);
    }

    scrollToEnd(options?: { animated?: boolean }) {
        this.scrollTo({y: 0, x: this.maxPositiveTransform, animated: options.animated});
    }

    scrollWithoutAnimationTo(y: number = 0, x: number = 0) {
        console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
        this.scrollTo({x, y, animated: false});
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
        this._scrollToCurrentPosition(true);
    }

    _getPositionMetaForX(x) {
        return Math.round(x / this._parentWidth);
    }

    _scrollToCurrentPosition(enableAnim) {
        const correctOffsetForPosition = this._parentWidth * this._currentSelPosition;
        this._totalOffset = correctOffsetForPosition;
        this.offset = 0;
        if (enableAnim) {
            Animated.timing(this._currentOffset, {
                toValue: -correctOffsetForPosition,
                easing: Easing.easeOut,
                duration: 200
            }).start();
        }
        else {
            this._currentOffset.setValue(-correctOffsetForPosition);
        }
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
            this.props.onScroll(normalizeScrollEvent(this, -1 * e.value));
        }
    };

    _setContentRef = x => {
        this._contentRef = x.children[0].children[0];
    };


    render() {
        const {
            /* eslint-disable */
            onScroll,
            onMomentumScrollBegin,
            onMomentumScrollEnd,
            onScrollBeginDrag,
            onScrollEndDrag,
            removeClippedSubviews,
            scrollEnabled,
            scrollEventThrottle,
            showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator,
            style,
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
                <Animated.View domRef={this._setContentRef}
                               style={{
                                   flex: 1,
                                   willChange: 'transform',
                                   transform: [{translateX: this._currentOffset}]
                               }} {...other} />
            </View>
        );
    }
}
