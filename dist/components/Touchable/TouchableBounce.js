/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableBounce
 * 
 */
'use strict';var _jsxFileName='src/components/Touchable/TouchableBounce.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var Animated=require('../../apis/Animated');
var EdgeInsetsPropType=require('../../propTypes/EdgeInsetsPropType');
var NativeMethodsMixin=require('../../modules/NativeMethodsMixin');
var React=require('react');
var StyleSheet=require('../../apis/StyleSheet');
var Touchable=require('./Touchable');








var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};

/**
 * Example of using the `TouchableMixin` to play well with other responder
 * locking views including `ScrollView`. `TouchableMixin` provides touchable
 * hooks (`this.touchableHandle*`) that we forward events to. In turn,
 * `TouchableMixin` expects us to implement some abstract methods to handle
 * interesting interactions such as `handleTouchablePress`.
 */
var TouchableBounce=React.createClass({displayName:'TouchableBounce',
mixins:[Touchable.Mixin,NativeMethodsMixin],

propTypes:{
onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,
// The function passed takes a callback to start the animation which should
// be run after this onPress handler is done. You can use this (for example)
// to update UI before starting the animation.
onPressWithCompletion:React.PropTypes.func,
// the function passed is called after the animation is complete
onPressAnimationComplete:React.PropTypes.func,
/**
     * When the scroll view is disabled, this defines how far your touch may
     * move off of the button, before deactivating the button. Once deactivated,
     * try moving it back and you'll see that the button is once again
     * reactivated! Move it back and forth several times while the scroll view
     * is disabled. Ensure you pass in a constant to reduce memory allocations.
     */
pressRetentionOffset:EdgeInsetsPropType,
/**
     * This defines how far your touch can start away from the button. This is
     * added to `pressRetentionOffset` when moving off of the button.
     * ** NOTE **
     * The touch area never extends past the parent view bounds and the Z-index
     * of sibling views always takes precedence if a touch hits two overlapping
     * views.
     */
hitSlop:EdgeInsetsPropType},


getInitialState:function getInitialState(){
return _extends({},
this.touchableGetInitialState(),{
scale:new Animated.Value(1)});},



bounceTo:function bounceTo(
value,
velocity,
bounciness,
callback)
{
Animated.spring(this.state.scale,{
toValue:value,
velocity:velocity,
bounciness:bounciness}).
start(callback);},


/**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.bounceTo(0.93,0.1,0);
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.bounceTo(1,0.4,0);
this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function touchableHandlePress(e){var _this=this;
var onPressWithCompletion=this.props.onPressWithCompletion;
if(onPressWithCompletion){
onPressWithCompletion(function(){
_this.state.scale.setValue(0.93);
_this.bounceTo(1,10,10,_this.props.onPressAnimationComplete);});

return;}


this.bounceTo(1,10,10,this.props.onPressAnimationComplete);
this.props.onPress&&this.props.onPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return 0;},


render:function render(){
var scaleTransform=[{scale:this.state.scale}];
var propsTransform=this.props.style.transform;
var transform=propsTransform&&Array.isArray(propsTransform)?propsTransform.concat(scaleTransform):scaleTransform;

return(
React.createElement(Animated.View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityRole:this.props.accessibilityRole||'button',
testID:this.props.testID,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:[styles.root,this.props.style,{transform:transform}],
tabIndex:'0',__source:{fileName:_jsxFileName,lineNumber:136}},

this.props.children));}});





var styles=StyleSheet.create({
root:{
cursor:'pointer',
userSelect:'none'}});



module.exports=TouchableBounce;