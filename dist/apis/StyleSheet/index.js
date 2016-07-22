var _jsxFileName='src/apis/StyleSheet/index.js';var _createReactStyleObject=require('./createReactStyleObject');var _createReactStyleObject2=_interopRequireDefault(_createReactStyleObject);
var _ExecutionEnvironment=require('fbjs/lib/ExecutionEnvironment');var _ExecutionEnvironment2=_interopRequireDefault(_ExecutionEnvironment);
var _flattenStyle=require('../../modules/flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ReactNativePropRegistry=require('../../modules/ReactNativePropRegistry');var _ReactNativePropRegistry2=_interopRequireDefault(_ReactNativePropRegistry);
var _StyleSheetValidation=require('./StyleSheetValidation');var _StyleSheetValidation2=_interopRequireDefault(_StyleSheetValidation);
var _predefs=require('./predefs');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var isRendered=false;
var styleElement=void 0;
var STYLE_SHEET_ID='__react-native-style';

var _injectStyleSheet=function _injectStyleSheet(){
// check if the server rendered the style sheet
styleElement=document.getElementById(STYLE_SHEET_ID);
// if not, inject the style sheet
if(!styleElement){document.head.insertAdjacentHTML('afterbegin',renderToString());}
isRendered=true;};


var _reset=function _reset(){
if(styleElement){document.head.removeChild(styleElement);}
styleElement=null;
isRendered=false;};


var absoluteFillObject={position:'absolute',left:0,right:0,top:0,bottom:0};
var absoluteFill=_ReactNativePropRegistry2.default.register(absoluteFillObject);

var create=function create(styles){
if(!isRendered&&_ExecutionEnvironment2.default.canUseDOM){
_injectStyleSheet();}


var result={};
for(var key in styles){
_StyleSheetValidation2.default.validateStyle(key,styles);
result[key]=_ReactNativePropRegistry2.default.register(styles[key]);}

return result;};


var render=function render(){return _react2.default.createElement('style',{dangerouslySetInnerHTML:{__html:_predefs.defaultStyles},id:STYLE_SHEET_ID,__source:{fileName:_jsxFileName,lineNumber:43}});};

var renderToString=function renderToString(){return'<style id="'+STYLE_SHEET_ID+'">'+_predefs.defaultStyles+'</style>';};

/**
 * Accepts React props and converts style declarations to classNames when necessary
 */
var resolve=function resolve(props){
var className=props.className||'';
var style=(0,_createReactStyleObject2.default)(props.style);
for(var prop in style){
var value=style[prop];
var replacementClassName=(0,_predefs.mapStyleToClassName)(prop,value);
if(replacementClassName){
className+=' '+replacementClassName;
// delete style[prop]
}}


return{className:className,style:style};};


module.exports={
_reset:_reset,
absoluteFill:absoluteFill,
absoluteFillObject:absoluteFillObject,
create:create,
hairlineWidth:1,
flatten:_flattenStyle2.default,
/* @platform web */
render:render,
/* @platform web */
resolve:resolve};