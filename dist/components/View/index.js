var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _applyLayout=require('../../modules/applyLayout');var _applyLayout2=_interopRequireDefault(_applyLayout);
var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _createReactDOMComponent=require('../../modules/createReactDOMComponent');var _createReactDOMComponent2=_interopRequireDefault(_createReactDOMComponent);
var _EdgeInsetsPropType=require('../../propTypes/EdgeInsetsPropType');var _EdgeInsetsPropType2=_interopRequireDefault(_EdgeInsetsPropType);
var _normalizeNativeEvent=require('../../modules/normalizeNativeEvent');var _normalizeNativeEvent2=_interopRequireDefault(_normalizeNativeEvent);
var _react=require('react');
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);
var _StyleSheetPropType=require('../../propTypes/StyleSheetPropType');var _StyleSheetPropType2=_interopRequireDefault(_StyleSheetPropType);
var _ViewStylePropTypes=require('./ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var eventHandlerNames=[
'onClick',
'onClickCapture',
'onMoveShouldSetResponder',
'onMoveShouldSetResponderCapture',
'onResponderGrant',
'onResponderMove',
'onResponderReject',
'onResponderRelease',
'onResponderTerminate',
'onResponderTerminationRequest',
'onStartShouldSetResponder',
'onStartShouldSetResponderCapture',
'onTouchCancel',
'onTouchCancelCapture',
'onTouchEnd',
'onTouchEndCapture',
'onTouchMove',
'onTouchMoveCapture',
'onTouchStart',
'onTouchStartCapture'];var


View=function(_Component){_inherits(View,_Component);function View(){_classCallCheck(this,View);return _possibleConstructorReturn(this,Object.getPrototypeOf(View).apply(this,arguments));}_createClass(View,[{key:'getChildContext',value:function getChildContext()

















































{
return{
isInAButtonView:this.props.accessibilityRole==='button'};}},{key:'render',value:function render()



{var _this2=this;var _props=







this.props;var collapsable=_props.collapsable;var hitSlop=_props.hitSlop;var onLayout=_props.onLayout;var pointerEvents=_props.pointerEvents;var style=_props.style;var other=_objectWithoutProperties(_props,['collapsable','hitSlop','onLayout','pointerEvents','style']);

var flattenedStyle=_StyleSheet2.default.flatten(style);
var pointerEventsStyle=pointerEvents&&{pointerEvents:pointerEvents};
// 'View' needs to set 'flexShrink:0' only when there is no 'flex' or 'flexShrink' style provided
var needsFlexReset=flattenedStyle.flex==null&&flattenedStyle.flexShrink==null;

var normalizedEventHandlers=eventHandlerNames.reduce(function(handlerProps,handlerName){
var handler=_this2.props[handlerName];
if(typeof handler==='function'){
handlerProps[handlerName]=_this2._normalizeEventForHandler(handler);}

return handlerProps;},
{});

var props=_extends({},
other,
normalizedEventHandlers,{
component:this.context.isInAButtonView?'span':'div',
style:[
styles.initial,
style,
needsFlexReset&&styles.flexReset,
pointerEventsStyle]});



return(0,_createReactDOMComponent2.default)(props);}},{key:'_normalizeEventForHandler',value:function _normalizeEventForHandler(


handler){
var callback=function callback(e){
e.nativeEvent=(0,_normalizeNativeEvent2.default)(e.nativeEvent);
return handler(e);};

return callback;}}]);return View;}(_react.Component);View.displayName='View';View.propTypes={accessibilityLabel:_createReactDOMComponent2.default.propTypes.accessibilityLabel,accessibilityLiveRegion:_createReactDOMComponent2.default.propTypes.accessibilityLiveRegion,accessibilityRole:_createReactDOMComponent2.default.propTypes.accessibilityRole,accessible:_createReactDOMComponent2.default.propTypes.accessible,children:_react.PropTypes.any,collapsable:_react.PropTypes.bool,hitSlop:_EdgeInsetsPropType2.default,onClick:_react.PropTypes.func,onClickCapture:_react.PropTypes.func,onLayout:_react.PropTypes.func,onMoveShouldSetResponder:_react.PropTypes.func,onMoveShouldSetResponderCapture:_react.PropTypes.func,onResponderGrant:_react.PropTypes.func,onResponderMove:_react.PropTypes.func,onResponderReject:_react.PropTypes.func,onResponderRelease:_react.PropTypes.func,onResponderTerminate:_react.PropTypes.func,onResponderTerminationRequest:_react.PropTypes.func,onStartShouldSetResponder:_react.PropTypes.func,onStartShouldSetResponderCapture:_react.PropTypes.func,onTouchCancel:_react.PropTypes.func,onTouchCancelCapture:_react.PropTypes.func,onTouchEnd:_react.PropTypes.func,onTouchEndCapture:_react.PropTypes.func,onTouchMove:_react.PropTypes.func,onTouchMoveCapture:_react.PropTypes.func,onTouchStart:_react.PropTypes.func,onTouchStartCapture:_react.PropTypes.func,pointerEvents:_react.PropTypes.oneOf(['auto','box-none','box-only','none']),style:(0,_StyleSheetPropType2.default)(_ViewStylePropTypes2.default),testID:_createReactDOMComponent2.default.propTypes.testID};View.defaultProps={accessible:true,style:{}};View.childContextTypes={isInAButtonView:_react.PropTypes.bool};View.contextTypes={isInAButtonView:_react.PropTypes.bool};



var styles=_StyleSheet2.default.create({
// https://github.com/facebook/css-layout#default-values
initial:{
alignItems:'stretch',
borderWidth:0,
borderStyle:'solid',
boxSizing:'border-box',
display:'flex',
flexBasis:'auto',
flexDirection:'column',
margin:0,
padding:0,
position:'relative',
// button and anchor reset
backgroundColor:'transparent',
color:'inherit',
font:'inherit',
textAlign:'inherit',
textDecorationLine:'none',
// list reset
listStyle:'none',
// fix flexbox bugs
minHeight:0,
minWidth:0},

flexReset:{
flexShrink:0}});



module.exports=(0,_applyLayout2.default)((0,_applyNativeMethods2.default)(View));