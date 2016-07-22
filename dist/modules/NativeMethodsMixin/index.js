var _react=require('react');








var _reactDom=require('react-dom');var _reactDom2=_interopRequireDefault(_reactDom);
var _UIManager=require('../../apis/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}
























var NativeMethodsMixin={
/**
   * Removes focus from an input or view. This is the opposite of `focus()`.
   */
blur:function blur(){
_UIManager2.default.blur(_reactDom2.default.findDOMNode(this));},


/**
   * Requests focus for the given input or view.
   * The exact behavior triggered will depend the type of view.
   */
focus:function focus(){
_UIManager2.default.focus(_reactDom2.default.findDOMNode(this));},


/**
   * Determines the position and dimensions of the view
   */
measure:function measure(callback){
_UIManager2.default.measure(
_reactDom2.default.findDOMNode(this),
mountSafeCallback(this,callback));},



/**
   * Determines the location of the given view in the window and returns the
   * values via an async callback. If the React root view is embedded in
   * another native view, this will give you the absolute coordinates. If
   * successful, the callback will be called be called with the following
   * arguments:
   *
   *  - x
   *  - y
   *  - width
   *  - height
   *
   * Note that these measurements are not available until after the rendering
   * has been completed in native.
   */
measureInWindow:function measureInWindow(callback){
_UIManager2.default.measureInWindow(
_reactDom2.default.findDOMNode(this),
mountSafeCallback(this,callback));},



/**
   * Measures the view relative to another view (usually an ancestor)
   */
measureLayout:function measureLayout(
relativeToNativeNode,
onSuccess,
onFail/* currently unused */)
{
_UIManager2.default.measureLayout(
_reactDom2.default.findDOMNode(this),
relativeToNativeNode,
mountSafeCallback(this,onFail),
mountSafeCallback(this,onSuccess));},



/**
   * This function sends props straight to the underlying DOM node.
   */
setNativeProps:function setNativeProps(nativeProps){
_UIManager2.default.updateView(
_reactDom2.default.findDOMNode(this),
nativeProps,
this);}};




/**
 * In the future, we should cleanup callbacks by cancelling them instead of
 * using this.
 *//**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */var mountSafeCallback=function mountSafeCallback(context,callback){return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}if(!callback){return undefined;}return callback.apply(context,args);};};

module.exports=NativeMethodsMixin;