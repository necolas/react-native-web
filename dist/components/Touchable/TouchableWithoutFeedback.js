/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableWithoutFeedback
 * 
 */
'use strict';

var EdgeInsetsPropType=require('../../propTypes/EdgeInsetsPropType');
var React=require('react');
var TimerMixin=require('react-timer-mixin');
var Touchable=require('./Touchable');
var View=require('../View');
var ensurePositiveDelayProps=require('./ensurePositiveDelayProps');
var warning=require('fbjs/lib/warning');
var StyleSheet=require('../../apis/StyleSheet');



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};

/**
 * Do not use unless you have a very good reason. All the elements that
 * respond to press should have a visual feedback when touched. This is
 * one of the primary reason a "web" app doesn't feel "native".
 *
 * > **NOTE**: TouchableWithoutFeedback supports only one child
 * >
 * > If you wish to have several child components, wrap them in a View.
 */
var TouchableWithoutFeedback=React.createClass({displayName:'TouchableWithoutFeedback',
mixins:[TimerMixin,Touchable.Mixin],

propTypes:{
accessible:View.propTypes.accessible,
accessibilityLabel:View.propTypes.accessibilityLabel,
accessibilityRole:View.propTypes.accessibilityRole,
/**
     * If true, disable all interactions for this component.
     */
disabled:React.PropTypes.bool,
/**
     * Called when the touch is released, but not if cancelled (e.g. by a scroll
     * that steals the responder lock).
     */
onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,
/**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
onLayout:React.PropTypes.func,

onLongPress:React.PropTypes.func,

/**
     * Delay in ms, from the start of the touch, before onPressIn is called.
     */
delayPressIn:React.PropTypes.number,
/**
     * Delay in ms, from the release of the touch, before onPressOut is called.
     */
delayPressOut:React.PropTypes.number,
/**
     * Delay in ms, from onPressIn, before onLongPress is called.
     */
delayLongPress:React.PropTypes.number,
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
return this.touchableGetInitialState();},


componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);},


/**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
touchableHandlePress:function touchableHandlePress(e){
this.props.onPress&&this.props.onPress(e);},


touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut||0;},


render:function render(){
// Note(avik): remove dynamic typecast once Flow has been upgraded
var child=React.Children.only(this.props.children);
var children=child.props.children;
warning(
!child.type||child.type.displayName!=='Text',
'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See '+(
child._owner&&child._owner.getName&&child._owner.getName()||'<unknown>'));

if(Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='View'){
if(!Array.isArray(children)){
children=[children];}

children.push(Touchable.renderDebugView({color:'red',hitSlop:this.props.hitSlop}));}

var style=Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='Text'?
[styles.root,child.props.style,{color:'red'}]:
[styles.root,child.props.style];
return React.cloneElement(child,{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityRole:this.props.accessibilityRole,
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:style,
children:children,
tabIndex:'0'});}});




var styles=StyleSheet.create({
root:{
cursor:'pointer'}});



module.exports=TouchableWithoutFeedback;