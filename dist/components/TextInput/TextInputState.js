var _UIManager=require('../../apis/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}









/**
 * This class is responsible for coordinating the "focused"
 * state for TextInputs. All calls relating to the keyboard
 * should be funneled through here
 */
var TextInputState={
/**
   * Internal state
   */
_currentlyFocusedNode:null,

/**
   * Returns the ID of the currently focused text field, if one exists
   * If no text field is focused it returns null
   */
currentlyFocusedField:function currentlyFocusedField(){
return this._currentlyFocusedNode;},


/**
   * @param {Object} TextInputID id of the text field to focus
   * Focuses the specified text field
   * noop if the text field was already focused
   */
focusTextInput:function focusTextInput(textFieldNode){
if(this._currentlyFocusedNode!==textFieldNode&&textFieldNode!==null){
this._currentlyFocusedNode=textFieldNode;
_UIManager2.default.focus(textFieldNode);}},



/**
   * @param {Object} textFieldNode id of the text field to focus
   * Unfocuses the specified text field
   * noop if it wasn't focused
   */
blurTextInput:function blurTextInput(textFieldNode){
if(this._currentlyFocusedNode===textFieldNode&&textFieldNode!==null){
this._currentlyFocusedNode=null;
_UIManager2.default.blur(textFieldNode);}}};/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */module.exports=TextInputState;