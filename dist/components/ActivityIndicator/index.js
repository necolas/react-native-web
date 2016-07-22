var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/components/ActivityIndicator/index.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactDom=require('react-dom');var _reactDom2=_interopRequireDefault(_reactDom);
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);
var _View=require('../View');var _View2=_interopRequireDefault(_View);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var GRAY='#999999';

var animationEffectTimingProperties={
direction:'alternate',
duration:700,
easing:'ease-in-out',
fill:'forwards',
iterations:Infinity};


var keyframeEffects=[
{transform:'scale(1)',opacity:1.0},
{transform:'scale(0.95)',opacity:0.5}];var


ActivityIndicator=function(_Component){_inherits(ActivityIndicator,_Component);function ActivityIndicator(){var _Object$getPrototypeO;var _temp,_this,_ret;_classCallCheck(this,ActivityIndicator);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_Object$getPrototypeO=Object.getPrototypeOf(ActivityIndicator)).call.apply(_Object$getPrototypeO,[this].concat(args))),_this),_this.



















































_createIndicatorRef=function(component){
_this._indicatorRef=component;},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(ActivityIndicator,[{key:'componentDidMount',value:function componentDidMount(){if(document.documentElement.animate){this._player=_reactDom2.default.findDOMNode(this._indicatorRef).animate(keyframeEffects,animationEffectTimingProperties);}this._manageAnimation();}},{key:'componentDidUpdate',value:function componentDidUpdate(){this._manageAnimation();}},{key:'render',value:function render(){var _props=this.props;var animating=_props.animating;var color=_props.color;var hidesWhenStopped=_props.hidesWhenStopped;var size=_props.size;var style=_props.style;var other=_objectWithoutProperties(_props,['animating','color','hidesWhenStopped','size','style']);return _react2.default.createElement(_View2.default,_extends({},other,{style:[styles.container,style],__source:{fileName:_jsxFileName,lineNumber:61}}),_react2.default.createElement(_View2.default,{ref:this._createIndicatorRef,style:[indicatorStyles[size],hidesWhenStopped&&!animating&&styles.hidesWhenStopped,{borderColor:color}],__source:{fileName:_jsxFileName,lineNumber:62}}));}},{key:'_manageAnimation',value:function _manageAnimation()


{
if(this._player){
if(this.props.animating){
this._player.play();}else
{
this._player.cancel();}}}}]);return ActivityIndicator;}(_react.Component);ActivityIndicator.propTypes={animating:_react.PropTypes.bool,color:_react.PropTypes.string,hidesWhenStopped:_react.PropTypes.bool,size:_react.PropTypes.oneOf(['small','large']),style:_View2.default.propTypes.style};ActivityIndicator.defaultProps={animating:true,color:GRAY,hidesWhenStopped:true,size:'small',style:{}};





(0,_applyNativeMethods2.default)(ActivityIndicator);

var styles=_StyleSheet2.default.create({
container:{
alignItems:'center',
justifyContent:'center'},

hidesWhenStopped:{
visibility:'hidden'}});



var indicatorStyles=_StyleSheet2.default.create({
small:{
borderRadius:100,
borderWidth:3,
width:20,
height:20},

large:{
borderRadius:100,
borderWidth:4,
width:36,
height:36}});



module.exports=ActivityIndicator;