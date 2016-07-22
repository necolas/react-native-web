/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableHighlight
 * @noflow
 */
'use strict';

// Note (avik): add  when Flow supports spread properties in propTypes
var _jsxFileName='src/components/Touchable/TouchableHighlight.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};
var ColorPropType=require('../../propTypes/ColorPropType');
var NativeMethodsMixin=require('../../modules/NativeMethodsMixin');
var React=require('react');
var StyleSheet=require('../../apis/StyleSheet');
var TimerMixin=require('react-timer-mixin');
var Touchable=require('./Touchable');
var TouchableWithoutFeedback=require('./TouchableWithoutFeedback');
var View=require('../View');

var ensureComponentIsNative=require('./ensureComponentIsNative');
var ensurePositiveDelayProps=require('./ensurePositiveDelayProps');
var keyOf=require('fbjs/lib/keyOf');
var merge=require('../../modules/merge');



var DEFAULT_PROPS={
activeOpacity:0.8,
underlayColor:'black'};


var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.  The
 * underlay comes from adding a view to the view hierarchy, which can sometimes
 * cause unwanted visual artifacts if not used correctly, for example if the
 * backgroundColor of the wrapped view isn't explicitly set to an opaque color.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableHighlight onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('image!myButton')}
 *       />
 *     </TouchableHighlight>
 *   );
 * },
 * ```
 * > **NOTE**: TouchableHighlight supports only one child
 * >
 * > If you wish to have several child components, wrap them in a View.
 */

var TouchableHighlight=React.createClass({displayName:'TouchableHighlight',
propTypes:_extends({},
TouchableWithoutFeedback.propTypes,{
/**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
activeOpacity:React.PropTypes.number,
/**
     * The color of the underlay that will show through when the touch is
     * active.
     */
underlayColor:ColorPropType,
style:View.propTypes.style,
/**
     * Called immediately after the underlay is shown
     */
onShowUnderlay:React.PropTypes.func,
/**
     * Called immediately after the underlay is hidden
     */
onHideUnderlay:React.PropTypes.func}),


mixins:[NativeMethodsMixin,TimerMixin,Touchable.Mixin],

getDefaultProps:function getDefaultProps(){return DEFAULT_PROPS;},

// Performance optimization to avoid constantly re-generating these objects.
computeSyntheticState:function computeSyntheticState(props){var
activeOpacity=props.activeOpacity;var style=props.style;var underlayColor=props.underlayColor;
return{
activeProps:{
style:{
opacity:activeOpacity}},


activeUnderlayProps:{
style:{
backgroundColor:underlayColor}},


underlayStyle:[
INACTIVE_UNDERLAY_PROPS.style,
props.style]};},




getInitialState:function getInitialState(){
return merge(this.touchableGetInitialState(),this.computeSyntheticState(this.props));},


componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentDidUpdate:function componentDidUpdate(){
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
if(nextProps.activeOpacity!==this.props.activeOpacity||
nextProps.underlayColor!==this.props.underlayColor||
nextProps.style!==this.props.style){
this.setState(this.computeSyntheticState(nextProps));}},



// viewConfig: {
//   uiViewClassName: 'RCTView',
//   validAttributes: ReactNativeViewAttributes.RCTView
// },

/**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._showUnderlay();
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._hideUnderlay();}

this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._showUnderlay();
this._hideTimeout=this.setTimeout(this._hideUnderlay,
this.props.delayPressOut||100);
this.props.onPress&&this.props.onPress(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;},


_showUnderlay:function _showUnderlay(){
if(!this.isMounted()||!this._hasPressHandler()){
return;}


this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
this.props.onShowUnderlay&&this.props.onShowUnderlay();},


_hideUnderlay:function _hideUnderlay(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(this._hasPressHandler()&&this.refs[UNDERLAY_REF]){
this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
this.refs[UNDERLAY_REF].setNativeProps(_extends({},
INACTIVE_UNDERLAY_PROPS,{
style:this.state.underlayStyle}));

this.props.onHideUnderlay&&this.props.onHideUnderlay();}},



_hasPressHandler:function _hasPressHandler(){
return!!(
this.props.onPress||
this.props.onPressIn||
this.props.onPressOut||
this.props.onLongPress);},



_onKeyEnter:function _onKeyEnter(e,callback){
var ENTER=13;
if(e.keyCode===ENTER){
callback&&callback(e);}},



render:function render(){var _this=this;
return(
React.createElement(View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityRole:this.props.accessibilityRole||this.props.accessibilityTraits||'button',
hitSlop:this.props.hitSlop,
onKeyDown:function onKeyDown(e){_this._onKeyEnter(e,_this.touchableHandleActivePressIn);},
onKeyPress:function onKeyPress(e){_this._onKeyEnter(e,_this.touchableHandlePress);},
onKeyUp:function onKeyUp(e){_this._onKeyEnter(e,_this.touchableHandleActivePressOut);},
onLayout:this.props.onLayout,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
ref:UNDERLAY_REF,
style:[styles.root,this.state.underlayStyle],
tabIndex:'0',
testID:this.props.testID,__source:{fileName:_jsxFileName,lineNumber:234}},
React.cloneElement(
React.Children.only(this.props.children),
{
ref:CHILD_REF})));}});







var CHILD_REF=keyOf({childRef:null});
var UNDERLAY_REF=keyOf({underlayRef:null});
var INACTIVE_CHILD_PROPS={
style:StyleSheet.create({x:{opacity:1.0}}).x};

var INACTIVE_UNDERLAY_PROPS={
style:StyleSheet.create({x:{backgroundColor:'transparent'}}).x};


var styles=StyleSheet.create({
root:{
cursor:'pointer',
userSelect:'none'}});



module.exports=TouchableHighlight;