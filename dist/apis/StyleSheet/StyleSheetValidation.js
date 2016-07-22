var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.

 * 
 */

var _react=require('react');
var _ImageStylePropTypes=require('../../components/Image/ImageStylePropTypes');var _ImageStylePropTypes2=_interopRequireDefault(_ImageStylePropTypes);
var _TextStylePropTypes=require('../../components/Text/TextStylePropTypes');var _TextStylePropTypes2=_interopRequireDefault(_TextStylePropTypes);
var _ViewStylePropTypes=require('../../components/View/ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);
var _warning=require('fbjs/lib/warning');var _warning2=_interopRequireDefault(_warning);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

StyleSheetValidation=function(){function StyleSheetValidation(){_classCallCheck(this,StyleSheetValidation);}_createClass(StyleSheetValidation,null,[{key:'validateStyleProp',value:function validateStyleProp(
prop,style,caller){
if(process.env.NODE_ENV!=='production'){
if(allStylePropTypes[prop]===undefined){
var message1='"'+prop+'" is not a valid style property.';
var message2='\nValid style props: '+JSON.stringify(Object.keys(allStylePropTypes).sort(),null,'  ');
styleError(message1,style,caller,message2);}else
{
var error=allStylePropTypes[prop](style,prop,caller,'prop');
if(error){
styleError(error.message,style,caller);}}}}},{key:'validateStyle',value:function validateStyle(





name,styles){
if(process.env.NODE_ENV!=='production'){
for(var prop in styles[name]){
StyleSheetValidation.validateStyleProp(prop,styles[name],'StyleSheet '+name);}}}},{key:'addValidStylePropTypes',value:function addValidStylePropTypes(




stylePropTypes){
for(var key in stylePropTypes){
allStylePropTypes[key]=stylePropTypes[key];}}}]);return StyleSheetValidation;}();




var styleError=function styleError(message1,style,caller,message2){
(0,_warning2.default)(
false,
message1+'\n'+(caller||'<<unknown>>')+': '+
JSON.stringify(style,null,'  ')+(message2||''));};



var allStylePropTypes={};

StyleSheetValidation.addValidStylePropTypes(_ImageStylePropTypes2.default);
StyleSheetValidation.addValidStylePropTypes(_TextStylePropTypes2.default);
StyleSheetValidation.addValidStylePropTypes(_ViewStylePropTypes2.default);
StyleSheetValidation.addValidStylePropTypes({
appearance:_react.PropTypes.string,
clear:_react.PropTypes.string,
cursor:_react.PropTypes.string,
display:_react.PropTypes.string,
direction:_react.PropTypes.string,/* @private */
float:_react.PropTypes.oneOf(['left','none','right']),
font:_react.PropTypes.string,/* @private */
listStyle:_react.PropTypes.string});


module.exports=StyleSheetValidation;