var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _ExecutionEnvironment=require('fbjs/lib/ExecutionEnvironment');var _ExecutionEnvironment2=_interopRequireDefault(_ExecutionEnvironment);
var _findIndex=require('lodash/findIndex');var _findIndex2=_interopRequireDefault(_findIndex);
var _invariant=require('fbjs/lib/invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var EVENT_TYPES=['change'];
var VISIBILITY_CHANGE_EVENT='visibilitychange';

var AppStates={
BACKGROUND:'background',
ACTIVE:'active'};


var listeners=[];var

AppState=function(){function AppState(){_classCallCheck(this,AppState);}_createClass(AppState,null,[{key:'addEventListener',value:function addEventListener(

















type,handler){
if(AppState.isSupported){
(0,_invariant2.default)(EVENT_TYPES.indexOf(type)!==-1,'Trying to subscribe to unknown event: "%s"',type);
var callback=function callback(){return handler(AppState.currentState);};
listeners.push([handler,callback]);
document.addEventListener(VISIBILITY_CHANGE_EVENT,callback,false);}}},{key:'removeEventListener',value:function removeEventListener(



type,handler){
if(AppState.isSupported){
(0,_invariant2.default)(EVENT_TYPES.indexOf(type)!==-1,'Trying to remove listener for unknown event: "%s"',type);
var listenerIndex=(0,_findIndex2.default)(listeners,function(pair){return pair[0]===handler;});
(0,_invariant2.default)(listenerIndex!==-1,'Trying to remove AppState listener for unregistered handler');
var callback=listeners[listenerIndex][1];
document.removeEventListener(VISIBILITY_CHANGE_EVENT,callback,false);
listeners.splice(listenerIndex,1);}}},{key:'currentState',get:function get(){if(!AppState.isSupported){return AppState.ACTIVE;}switch(document.visibilityState){case'hidden':case'prerender':case'unloaded':return AppStates.BACKGROUND;default:return AppStates.ACTIVE;}}}]);return AppState;}();AppState.isSupported=_ExecutionEnvironment2.default.canUseDOM&&document.visibilityState;




module.exports=AppState;