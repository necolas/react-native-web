var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */

var _react=require('react');
var _invariant=require('fbjs/lib/invariant');var _invariant2=_interopRequireDefault(_invariant);
var _reactDom=require('react-dom');var _reactDom2=_interopRequireDefault(_reactDom);
var _renderApplication=require('./renderApplication');var _renderApplication2=_interopRequireDefault(_renderApplication);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var runnables={};









/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */var
AppRegistry=function(){function AppRegistry(){_classCallCheck(this,AppRegistry);}_createClass(AppRegistry,null,[{key:'getAppKeys',value:function getAppKeys()
{
return Object.keys(runnables);}},{key:'prerenderApplication',value:function prerenderApplication(


appKey,appParameters){
(0,_invariant2.default)(
runnables[appKey]&&runnables[appKey].prerender,
'Application '+appKey+' has not been registered. '+
'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');


return runnables[appKey].prerender(appParameters);}},{key:'registerComponent',value:function registerComponent(


appKey,getComponentFunc){
runnables[appKey]={
run:function run(_ref){var initialProps=_ref.initialProps;var rootTag=_ref.rootTag;return(0,_renderApplication2.default)(getComponentFunc(),initialProps,rootTag);},
prerender:function prerender(){var _ref2=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var initialProps=_ref2.initialProps;return(0,_renderApplication.prerenderApplication)(getComponentFunc(),initialProps);}};

return appKey;}},{key:'registerConfig',value:function registerConfig(


config){
config.forEach(function(_ref3){var appKey=_ref3.appKey;var component=_ref3.component;var run=_ref3.run;
if(run){
AppRegistry.registerRunnable(appKey,run);}else
{
(0,_invariant2.default)(component,'No component provider passed in');
AppRegistry.registerComponent(appKey,component);}});}




// TODO: fix style sheet creation when using this method
},{key:'registerRunnable',value:function registerRunnable(appKey,run){
runnables[appKey]={run:run};
return appKey;}},{key:'runApplication',value:function runApplication(


appKey,appParameters){
var isDevelopment=process.env.NODE_ENV!=='production';
var params=_extends({},appParameters);
params.rootTag='#'+params.rootTag.id;

console.log(
'Running application "'+appKey+'" with appParams: '+JSON.stringify(params)+'. '+('development-level warnings are '+(
isDevelopment?'ON':'OFF')+', ')+('performance optimizations are '+(
isDevelopment?'OFF':'ON')));


(0,_invariant2.default)(
runnables[appKey]&&runnables[appKey].run,
'Application "'+appKey+'" has not been registered. '+
'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');


runnables[appKey].run(appParameters);}},{key:'unmountApplicationComponentAtRootTag',value:function unmountApplicationComponentAtRootTag(


rootTag){
_reactDom2.default.unmountComponentAtNode(rootTag);}}]);return AppRegistry;}();



module.exports=AppRegistry;