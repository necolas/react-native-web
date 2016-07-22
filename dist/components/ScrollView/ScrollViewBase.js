Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/components/ScrollView/ScrollViewBase.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();







var _debounce=require('lodash/debounce');var _debounce2=_interopRequireDefault(_debounce);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _View=require('../View');var _View2=_interopRequireDefault(_View);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 *//**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */var ScrollViewBase=function(_Component){_inherits(ScrollViewBase,_Component);














function ScrollViewBase(props){_classCallCheck(this,ScrollViewBase);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ScrollViewBase).call(this,
props));_this.




_handlePreventableScrollEvent=function(handler){
return function(e){
if(!_this.props.scrollEnabled){
e.preventDefault();}else
{
if(handler)handler(e);}};};_this.




_handleScroll=function(e){var
scrollEventThrottle=_this.props.scrollEventThrottle;
// A scroll happened, so the scroll bumps the debounce.
_this._debouncedOnScrollEnd(e);
if(_this._state.isScrolling){
// Scroll last tick may have changed, check if we need to notify
if(_this._shouldEmitScrollEvent(_this._state.scrollLastTick,scrollEventThrottle)){
_this._handleScrollTick(e);}}else

{
// Weren't scrolling, so we must have just started
_this._handleScrollStart(e);}};_this._debouncedOnScrollEnd=(0,_debounce2.default)(_this._handleScrollEnd,100);_this._state={isScrolling:false};return _this;}_createClass(ScrollViewBase,[{key:'_handleScrollStart',value:function _handleScrollStart(



e){
this._state.isScrolling=true;
this._state.scrollLastTick=Date.now();}},{key:'_handleScrollTick',value:function _handleScrollTick(


e){var
onScroll=this.props.onScroll;
this._state.scrollLastTick=Date.now();
if(onScroll)onScroll(e);}},{key:'_handleScrollEnd',value:function _handleScrollEnd(


e){var
onScroll=this.props.onScroll;
this._state.isScrolling=false;
if(onScroll)onScroll(e);}},{key:'_shouldEmitScrollEvent',value:function _shouldEmitScrollEvent(


lastTick,eventThrottle){
var timeSinceLastTick=Date.now()-lastTick;
return eventThrottle>0&&timeSinceLastTick>=1000/eventThrottle;}},{key:'render',value:function render()


{var _props=



this.props;var onMomentumScrollBegin=_props.onMomentumScrollBegin;var onMomentumScrollEnd=_props.onMomentumScrollEnd;var onScrollBeginDrag=_props.onScrollBeginDrag;var onScrollEndDrag=_props.onScrollEndDrag;var scrollEnabled=_props.scrollEnabled;var scrollEventThrottle=_props.scrollEventThrottle;var other=_objectWithoutProperties(_props,['onMomentumScrollBegin','onMomentumScrollEnd','onScrollBeginDrag','onScrollEndDrag','scrollEnabled','scrollEventThrottle']);

return(
_react2.default.createElement(_View2.default,_extends({},
other,{
onScroll:this._handleScroll,
onTouchMove:this._handlePreventableScrollEvent(this.props.onTouchMove),
onWheel:this._handlePreventableScrollEvent(this.props.onWheel),__source:{fileName:_jsxFileName,lineNumber:94}})));}}]);return ScrollViewBase;}(_react.Component);ScrollViewBase.propTypes=_extends({},_View2.default.propTypes,{onMomentumScrollBegin:_react.PropTypes.func,onMomentumScrollEnd:_react.PropTypes.func,onScroll:_react.PropTypes.func,onScrollBeginDrag:_react.PropTypes.func,onScrollEndDrag:_react.PropTypes.func,onTouchMove:_react.PropTypes.func,onWheel:_react.PropTypes.func,scrollEnabled:_react.PropTypes.bool,scrollEventThrottle:_react.PropTypes.number});ScrollViewBase.defaultProps={scrollEnabled:true};exports.default=ScrollViewBase;