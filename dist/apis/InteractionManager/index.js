var _keyMirror=require('fbjs/lib/keyMirror');var _keyMirror2=_interopRequireDefault(_keyMirror);







var _invariant=require('fbjs/lib/invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */var InteractionManager={Events:(0,_keyMirror2.default)({interactionStart:true,interactionComplete:true}),


/**
   * Schedule a function to run after all interactions have completed.
   */
runAfterInteractions:function runAfterInteractions(callback){
(0,_invariant2.default)(
typeof callback==='function',
'Must specify a function to schedule.');

callback();},


/**
   * Notify manager that an interaction has started.
   */
createInteractionHandle:function createInteractionHandle(){
return 1;},


/**
   * Notify manager that an interaction has completed.
   */
clearInteractionHandle:function clearInteractionHandle(handle){
(0,_invariant2.default)(
!!handle,
'Must provide a handle to clear.');},



addListener:function addListener(){}};


module.exports=InteractionManager;